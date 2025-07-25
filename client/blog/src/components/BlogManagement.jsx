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
  onTogglePublish,
}) => {
  const isEditing = editPostId === post._id;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-8">
      {!isEditing && post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-60 object-cover rounded-t-2xl"
        />
      )}

      <div className="p-6 space-y-4">
        {isEditing ? (
          <form onSubmit={(e) => onUpdateSubmit(e, post._id)} className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 text-white dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={editPostData.title}
              onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 text-white dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={editPostData.excerpt}
              onChange={(e) => setEditPostData({ ...editPostData, excerpt: e.target.value })}
              placeholder="Excerpt"
            />
            <textarea
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 text-white dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={editPostData.content}
              onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}
              placeholder="Content"
            />
            <input
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 text-white dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={editPostData.tag}
              onChange={(e) => setEditPostData({ ...editPostData, tag: e.target.value })}
              placeholder="Tags (comma-separated)"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editPostData.isPublish}
                onChange={(e) =>
                  setEditPostData({ ...editPostData, isPublish: e.target.checked })
                }
                className="accent-blue-500"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">Publish</label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" onClick={() => setEditPostId(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {post.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400 pt-2">
              <span>By {post.author?.username || "Unknown"}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-blue-600 dark:text-blue-400 mt-1">
              <span>{post.viewCount} views</span>
              <span>{post.comments?.length || 0} comments</span>
            </div>

            {/* Publish Badge */}
            <div className="pt-2">
              {post.isPublished ? (
                <span className="inline-block bg-green-100text-white text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                  Published
                </span>
              ) : (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  Draft
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex text-white gap-3 flex-wrap">
              <Button variant="primary" onClick={() => onEditClick(post)}>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(post._id)}>Delete</Button>
              <Button
                variant="outline"
                onClick={() => onTogglePublish(post)}
              >
                {post.isPublished ? "Click Unpublish" : "Click Publish"}
              </Button>
              <Link
                to={`/readmore/${post._id}`}
                className="inline-block text-blue-500 dark:text-blue-400 hover:underline font-medium"
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
