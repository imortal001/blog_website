import Blog from '../models/blogModel.js';

// Save or update a draft
export const saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags, status } = req.body;
    
    // If id exists, update the existing blog
    if (id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'draft' },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      return res.json(updatedBlog);
    }
    
    // Otherwise, create a new blog
    const newBlog = new Blog({
      title,
      content,
      tags,
      status: 'draft',
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Publish a blog
export const publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    
    // If id exists, update the existing blog
    if (id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'published' },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      return res.json(updatedBlog);
    }
    
    // Otherwise, create a new published blog
    const newBlog = new Blog({
      title,
      content,
      tags,
      status: 'published',
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error publishing blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};