import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // or useRouter if Next.js
import { postService } from '../services/api.jsx';

const ReadMore = () => {
  const { id } = useParams(); // dynamic slug from URL
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(id);
        const postData = res.post;
        const user = JSON.parse( localStorage.getItem('user'))
        console.log(' id :', id);
        console.log('user', user)
        // console.log('token:', localStorage.getItem('token'));

        if (postData.isPublished) {
          setPost(postData);
        //   await postService.incrementViewCount(id); // Increment view count
        }
        else {
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
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await postService.addComment(id, comment)
      console.log('comment :',res.comment)

      setPost({ ...post, comments: [...post.comments, res.comment] });
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  // console.log('Post comment', post.comments[0].user);

  if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!post) return <div className="text-center py-10 text-red-600">Post not found or unpublished.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-900 dark:text-white">
      <img src={`http://localhost:5000/uploads/${post.featuredImage}`} alt={post.title} className="w-full h-64 object-cover rounded" />
      
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        By {post.author?.username || 'Unknown'} | {new Date(post.createdAt).toLocaleDateString()} | {post.category?.name}
      </div>

      <p className="mt-6 text-lg leading-relaxed">{post.content}</p>

      <div className="mt-4 text-sm text-gray-500">
        👁️ {post.viewCount} views · 💬 {post.comments.length} comments
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {post.comments.map((c, idx) => (
          c && (
            <div key={idx} className="border-t py-2">
              <p className="text-sm">{c.content || 'No content'}</p>
              <p className="text-xs text-gray-400">
                By {c.user?.username || 'Anonymous'} on {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          )
        ))}

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReadMore;
