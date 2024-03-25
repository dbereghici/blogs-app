export async function getBlogs() {
    try {
        const response = await fetch("http://localhost:5000/api/blogs", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        return response.json();
    } catch (error) {
        throw new Error("Error fetching blogs: " + error.message);
    }
}

export async function saveBlog(formData) {
    try {
        const response = await fetch("http://localhost:5000/api/blogs", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to save blog");
        }
    } catch (error) {
        throw new Error("Error saving blog: " + error.message);
    }
}
