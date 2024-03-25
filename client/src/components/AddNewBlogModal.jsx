import Modal from "react-modal";

const modalStyles = {
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
};

function BlogModal({ isOpen, handleClose, formData, handleChange, handleSubmit }) {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Add new blog"
            style={modalStyles}
        >
            <button className="button close-modal-button" onClick={handleClose}>Close</button>

            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h3>Title</h3>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <h3>Content</h3>
                    <textarea
                        style={{ minWidth: "500px", minHeight: "5em" }}
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                    <div style={{ marginTop: '10px' }}>
                        <button className="button" type="submit">Save</button>
                    </div>
                </form>

            </div>
        </Modal>
    );
};

export default BlogModal;