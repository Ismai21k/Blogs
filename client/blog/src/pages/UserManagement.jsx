
import { useState, useEffect } from "react"
import { postService } from "../services/api.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import BlogManagement from "../components/BlogManagement.jsx"
import { categoryService } from "../services/api.jsx"
import { Button } from "../components/Buttom.jsx"

const UserManagement = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editPostId, setEditPostId] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editPostData, setEditPostData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tag: "",
    isPublished: false,
  })

  const user = JSON.parse(localStorage.getItem("user"))
  console.log('user :',user)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await postService.getUserPosts(user._id, page)
        const postData = res.posts
        if (postData) {
          setPosts(postData)
          setTotalPages(res.totalPages || 1)
        } else {
          console.log("User posts not found")
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleDeleteCategory = async (id) => {
    try {
      await categoryService.deleteCategory(id)
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      const deletedPost = posts.find((p) => p._id === postId)
      const categoryId = deletedPost?.category

      await postService.deletePost(postId)
      setPosts((prev) => prev.filter((p) => p._id !== postId))

      if (categoryId) {
        await handleDeleteCategory(categoryId)
      }

      alert("Blog deleted successfully!")
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const handleEditClick = (post) => {
    setEditPostId(post._id)
    setEditPostData({
      title: post.title,
      content: post.content || "",
      excerpt: post.excerpt || "",
      tag: post.tag || "",
      isPublished: post.isPublished || false,
    })
  }

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault()
    try {
      await postService.updatePost(id, editPostData)
      setEditPostId(null)
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  const togglePublish = async (post) => {
    const updated = {
      ...post,
      isPublished: !post.isPublished,
    }

    try {
      await postService.updatePost(post._id, { isPublished: updated.isPublished })
      setPosts((prev) => prev.map((p) => (p._id === post._id ? { ...p, isPublished: updated.isPublished } : p)))
    } catch (error) {
      console.error("Failed to toggle publish status:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading your posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 11.5V5zM7.707 7.293a1 1 0 00-1.414 1.414L7.586 10l-1.293 1.293a1 1 0 101.414 1.414L9 11.414l1.293 1.293a1 1 0 001.414-1.414L10.414 10l1.293-1.293a1 1 0 00-1.414-1.414L9 8.586 7.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Manage Your Posts</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Edit, publish, or delete your blog posts. Keep your content fresh and engaging.
          </p>
        </div>

        {/* Posts Management */}
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-200 hover:shadow-2xl"
                >
                  <BlogManagement
                    post={post}
                    onDelete={handleDeletePost}
                    onEditClick={handleEditClick}
                    onUpdateSubmit={handleUpdateSubmit}
                    editPostId={editPostId}
                    editPostData={editPostData}
                    setEditPostData={setEditPostData}
                    setEditPostId={setEditPostId}
                    onTogglePublish={togglePublish}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No posts yet</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                You haven't created any blog posts yet. Start writing your first post to share your ideas with the
                world!
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Your First Post
              </button>
            </div>
          )}

          {/* Pagination */}
          {posts.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button
                title="previous"
                disabled={page === 1}
                onClick={handlePrev}
                variant="secondary"
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>
              </div>

              <Button
                title="next"
                disabled={page === totalPages}
                onClick={handleNext}
                variant="secondary"
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default UserManagement
