import { useEffect, useState } from "react";
import Modal from 'react-modal';
import BlogModal from "../components/AddNewBlogModal";
import { getBlogs, saveBlog } from "../services/apiService";

Modal.setAppElement('#root');

const Blogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.title.trim() || !formData.content.trim()) {
                console.error("Please fill in both title and content fields.");
                return;
            }

            await saveBlog(formData);
            setFormData({ title: "", content: "" });
            setShowModal(false);
            getBlogs()
                .then(setBlogs)
                .catch(console.error);
        } catch (error) {
            console.error("Error saving data:", error.message);
        }
    };

    useEffect(() => {
        getBlogs()
            .then(setBlogs)
            .catch(console.error);
    }, []);

    return (
        <div className="home center">
            {blogs === null ? (
                <p>Loading...</p>
            ) : blogs.length > 0 ? (
                <ul>
                    {blogs.map(blog => (
                        <li key={blog._id}>
                            <h2>{blog.title}</h2>
                            <p>{blog.content}</p>
                            <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data</p>
            )}

            <button className="button" onClick={handleOpenModal}>Add new blog post</button>

            <BlogModal
                isOpen={showModal}
                handleClose={handleCloseModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Blogs
