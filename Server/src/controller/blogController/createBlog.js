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
exports.readAllBlog = async(req, res) => {
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
exports.readBlogByCategory = async(req, res) => {
    const {category} = req.body
    try {
        const blogs = await Blog.find({category:category})

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