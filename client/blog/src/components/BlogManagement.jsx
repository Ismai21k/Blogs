import { Button } from "./Buttom.jsx";
import { Link } from "react-router-dom";

const BlogManagement = ({
  post,
  onDelete,
  onEditClick,
  onUpdateSubmit,
  editPostId,
  editPostData,
  setEditPostData,
  setEditPostId,
 
}) => {
  const isEditing = editPostId === post._id;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300">
      {post.featuredImage && !isEditing && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        {isEditing ? (
          <form onSubmit={(e) => onUpdateSubmit(e, post._id)} className="space-y-2">
            <input
              className="w-full border p-2"
              value={editPostData.title}
              onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              className="w-full border p-2"
              value={editPostData.excerpt}
              onChange={(e) => setEditPostData({ ...editPostData, excerpt: e.target.value })}
              placeholder="Excerpt"
            />
            <textarea
              className="w-full border p-2"
              value={editPostData.content}
              onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}
              placeholder="Content"
            />
            <input
              className="w-full border p-2"
              value={editPostData.tag}
              onChange={(e) => setEditPostData({ ...editPostData, tag: e.target.value })}
              placeholder="Tags (comma-separated)"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editPostData.isPublish}
                onChange={(e) => setEditPostData({ ...editPostData, isPublish: e.target.checked })}
              />
              <label>Publish</label>
            </div>

            <div className="flex gap-2 mt-2">
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" onClick={() => setEditPostId(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>By {post.author?.username || "Unknown"}</span>
              <span>{post.createdAt}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-blue-600">{post.viewCount} views</span>
              <span>{post.comments?.length || 0} comments</span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="primary" onClick={() => onEditClick(post)}>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(post._id)}>Delete</Button>
              <Link
                to={`/readmore/${post._id}`}
                className="inline-block text-blue-500 hover:underline ml-2"
              >
                Read More →
              </Link>
              
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
