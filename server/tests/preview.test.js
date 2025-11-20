const { previewBlog } = require('../controllers/postController');
const Post = require('../models/Post');
// ensure findById is a jest mock function for these tests
Post.findById = jest.fn();

describe('previewBlog controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: 'testid' },
      get: jest.fn(),
      protocol: 'http'
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      redirect: jest.fn(() => res),
      set: jest.fn(() => res)
    };

    jest.clearAllMocks();
  });

  test('returns 404 when post not found', async () => {
    Post.findById.mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
    req.get.mockImplementation((k) => (k === 'user-agent' ? '' : 'localhost:5000'));

    await previewBlog(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Post not found');
  });

  test('redirects human users to client route', async () => {
    const mockPost = { _id: 'abc123', title: 'Hello', excerpt: 'Ex', featuredImage: '/uploads/img.jpg', author: { username: 'Alice' } };
    Post.findById.mockReturnValue({ populate: jest.fn().mockResolvedValue(mockPost) });
  req.get.mockImplementation((k) => (k === 'user-agent' ? 'Mozilla/5.0 (Windows NT)' : 'example.com'));

    await previewBlog(req, res);

    expect(res.redirect).toHaveBeenCalledWith(302, 'http://example.com/readmore/abc123');
  });

  test('serves HTML with OG tags for bots', async () => {
    const mockPost = { _id: 'abc123', title: 'Hello', excerpt: 'Ex', featuredImage: '/uploads/img.jpg', author: { username: 'Alice' }, createdAt: new Date('2020-01-01') };
  Post.findById.mockReturnValue({ populate: jest.fn().mockResolvedValue(mockPost) });
    req.get.mockImplementation((k) => (k === 'user-agent' ? 'facebookexternalhit/1.1' : 'example.com'));
    req.protocol = 'https';

    await previewBlog(req, res);

    expect(res.set).toHaveBeenCalledWith('Content-Type', 'text/html');
    expect(res.send).toHaveBeenCalled();
    const sent = res.send.mock.calls[0][0];
    expect(sent).toContain('<meta property="og:title" content="Hello"');
    expect(sent).toContain('application/ld+json');
  });
});
