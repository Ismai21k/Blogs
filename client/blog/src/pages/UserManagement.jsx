import { useState, useEffect } from 'react';
import { postService } from '../services/api.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import BlogManagement from '../components/BlogManagement.jsx';
import { categoryService } from '../services/api.jsx';
import { Button } from '../components/Buttom.jsx';

const UserManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPostId, setEditPostId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editPostData, setEditPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tag: '',
    isPublished: false,
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await postService.getUserPosts(user._id, page);
        const postData = res.posts;
        if (postData) {
          setPosts(postData);
          setTotalPages(res.totalPages || 1);
        } else {
          console.log('User posts not found');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user._id, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoryService.deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const deletedPost = posts.find((p) => p._id === postId);
      const categoryId = deletedPost?.category;

      await postService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));

      if (categoryId) {
        await handleDeleteCategory(categoryId);
      }

      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditPostData({
      title: post.title,
      content: post.content || '',
      excerpt: post.excerpt || '',
      tag: post.tag || '',
      isPublished: post.isPublished || false,
    });
  };
  
  console.log('postData :', posts)
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await postService.updatePost(id, editPostData);
      setEditPostId(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const togglePublish = async (post) => {
    const updated = {
      ...post,
      isPublished: !post.isPublished,
    };

    try {
      await postService.updatePost(post._id, { isPublished: updated.isPublished });
      setPosts((prev) =>
        prev.map((p) => (p._id === post._id ? { ...p, isPublished: updated.isPublished } : p))
      );
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
    }
  };

  if (loading) return <div className="bg-gradient-to-br from-blue-200 text-center py-10">Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-semibold text-center mt-6 mb-4">Blog Management</h1>
      <div className="space-y-4 px-4">
        {posts.map((post) => (
          <BlogManagement
            key={post._id}
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
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 my-6">
        <Button disabled={page === 1} onClick={handlePrev} variant="secondary">
          ◀ Prev
        </Button>
        <span className="text-sm font-medium">Page {page}</span>
        <Button disabled={page === totalPages} onClick={handleNext} variant="secondary">
          Next ▶
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;
