import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
const ReadMore = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(id);
        const postData = res.post;
        if (postData?.isPublished) {
          setPost(postData);
        } else {
          console.log('Post is not published or does not exist');
          setPost(null);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await postService.addComment(id, comment);
      setPost({ ...post, comments: [...post.comments, res.comment] });
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) {
    return <div className="bg-gradient-to-br from-blue-200  text-center py-10 text-lg font-medium text-gray-500 ">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-600 text-lg font-semibold">Post not found or unpublished.</div>;
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 ">
    <Navbar />
  <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
    <div className="max-w-4xl mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <img
        src={`http://localhost:5000/uploads/${post.featuredImage}`}
        alt={post.title}
        className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
      />

      <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white mb-2">
        {post.title}
      </h1>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        By{' '}
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          {post.author?.username || 'Unknown'}
        </span>{' '}
        · {new Date(post.createdAt).toLocaleDateString()} ·{' '}
        <span className="italic">{post.category?.name}</span>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
        {post.content}
      </p>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        👁️ {post.viewCount} views · 💬 {post.comments.length} comments
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Comments
        </h2>

        <div className="space-y-4">
          {post.comments.map(
            (c, idx) =>
              c && (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800/70 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {c.content || 'No content'}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    By{' '}
                    <span className="font-semibold">
                      {c.user?.username || 'Anonymous'}
                    </span>{' '}
                    on {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
              )
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
          />
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  </div>
  <Footer />
  </div>
);
}

export default ReadMore;
