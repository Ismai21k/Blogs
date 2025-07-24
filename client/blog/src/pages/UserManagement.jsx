import {useState, useEffect} from 'react';
import { postService } from '../services/api.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import BlogManagement from '../components/BlogManagement.jsx';
import { categoryService } from '../services/api.jsx';
import { Button } from '../components/Buttom.jsx';


const UserManagement = () => {
     // const [ id ] = useParams;
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [EditPostId, setEditPostId] = useState(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editPostData, setEditPostData] = useState({ title: '', content:'', excerpt:'', tag: '', isPublish:''})
    const storeUser = localStorage.getItem('user');
    const user   = JSON.parse(storeUser);
    console.log('user id :',user._id)

    useEffect(() => {

        const fetchPost = async () => {
            try {
                const res = await postService.getUserPosts(user._id)
                const postData = res.posts;
                console.log('posts :',res)
                if (postData) {
                    setPosts(postData)
                    setTotalPages(res.totalPages)
                    
                } else {
                    console.log('Users post not found')
                }

            } catch (error) {
                console.log('Error fetching post', error)
                
            } finally {
                setLoading(false)
            }
            
        }
        fetchPost()
    },[])
     
    const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };



     const handleDeleteCategory = async (id) => {
        try {
            
            await categoryService.deleteCategory(id);

            
        } catch (error) {
            console.log('Error deleting a category',error)
            
        }
     }
    const handleDeletePost = async (postId) => {
        try {
        // 1. Get the post you are about to delete
        const deletedPost = posts.find(p => p._id === postId);
        const categoryId = deletedPost?.category;

        // 2. Delete the post
        await postService.deletePost(postId);

        // 3. Update state
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));

        // 4. Optionally delete its category if needed
        if (categoryId) {
            await handleDeleteCategory(categoryId);
        }

        alert("Blog deleted successfully!");
    } catch (error) {
        console.error("Delete failed", error);
    }
};


    const handleEditClick = (post) => {
  setEditPostId(post._id);
  setEditPostData({
    title: post.title,
    content: post.content || '',
    excerpt: post.excerpt,
    tag: post.tag || '',
    isPublish: post.isPublish || false,
  });
};

const handleUpdateSubmit = async (e, id) => {
  e.preventDefault();
  try {
    await postService.updatePost(id, editPostData);
    setEditPostId(null); // Close the edit form
  } catch (error) {
    console.error("Update failed", error);
  }
};

     if (loading) return <div className="text-center py-10">Loading...</div>;

    return ( 
        <div>
        <Navbar />
        <h1>Blog Management</h1>
        <div>
            {posts.map(post => (

                <BlogManagement

                key={post._id}
                post={post}
                onDelete={handleDeletePost}
                onEditClick={handleEditClick}
                onUpdateSubmit={handleUpdateSubmit}
                editPostId={EditPostId}
                editPostData={editPostData}
                setEditPostData={setEditPostData}
                setEditPostId={setEditPostId}
               
            />
                

            ))}
            
        </div>
        <div>
            <Button  disabled={page === 1} onClick={handlePrev} variant="secondary" >◀ Prev</Button>            
            <span className="text-sm">Page {page}</span>
            <Button  disabled={page === totalPages} onClick={handleNext} variant="secondary" > Next ▶</Button>
                

        </div>

        <Footer />
        </div>
     );
}
 
export default UserManagement;