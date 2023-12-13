const Blog = require("../../models/blogModel")


// Create a new blog
exports.createBlog = async (req, res) => {
    const { id, name, image, category, title, description } = req.body

    try {
        if (!id || !name || !image || !category || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const newBlog = await new Blog({
            owner: id,
            name,
            image,
            category,
            title,
            description
        })

        await newBlog.save();

        res.status(200).json({
            success: true,
            message: "New blog is created successful"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        })
    }
}


// Read all blogs
exports.readAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find()

        res.status(200).json({
            success: true,
            message: "Successful",
            blogs
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        })
    }
}


//read blog by category
exports.readBlogByCategory = async (req, res) => {
    const { category } = req.body
    try {
        const blogs = await Blog.find({ category: category })

        if(!blogs){
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Successful",
            blogs
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        })
    }
}


// Specific blog details by id

exports.blogDetails = async (req, res) => {
    const { id } = req.body;
    try {
        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Success",
            blog
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        })
    }
}


//delete blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.body;
    try {
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog){
            return res.status(400).json({
                success: false,
                message: "Blog not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Blog is deleted",
            blog
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            error: error
        })
    }
}