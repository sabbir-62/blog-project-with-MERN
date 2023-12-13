const Blog = require("../../models/blogModel");

// Update Blog
exports.updateBlog = async (req, res) => {
    const { id, name, image, category, title, description } = req.body;

    try {
        if (!id || !name || !image || !category || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Update the blog fields
        blog.name = name;
        blog.image = image;
        blog.category = category;
        blog.title = title;
        blog.description = description;

        // Save the updated blog
        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        });
    }
};
