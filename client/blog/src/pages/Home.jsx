

import { useEffect, useState } from "react"
import { postService } from "../services/api.jsx"
import PostCard from "../components/PostCard.jsx"
import { Layout } from "../components/Layout.jsx"
import { Link } from "react-router-dom"
const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts()
        setPosts(data.posts)

        if (data.posts.length === 0) {
          alert("No posts available at the moment.")
        } else {
          console.log("Posts:", data.posts)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
        alert("Failed to load posts.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading posts...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stories & Ideas
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore insightful articles, tutorials, and stories from our community of passionate writers and creators.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 lg:gap-12">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`transform transition-all duration-500 hover:scale-[1.02] ${
                  index % 2 === 0 ? "lg:translate-x-4" : "lg:-translate-x-4"
                }`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No posts yet</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Be the first to share your story! Create your first blog post and inspire others.
            </p>
          </div>
        )}

        {/* Call to Action */}
        {posts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
              <p className="text-xl opacity-90 mb-6">
                Join our community of writers and share your unique perspective with the world.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link to="/newblog">
                   Start Writing
                </Link>
                
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home
