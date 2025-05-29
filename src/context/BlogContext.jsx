import React, { createContext, useContext, useCallback } from 'react';
import axios from 'axios';

const BlogContext = createContext(undefined);

// API URL
const API_URL = 'http://localhost:5000';

export const BlogProvider = ({ children }) => {
  // Save or update a blog draft
  const saveDraft = useCallback(async (blog) => {
    try {
      const response = await axios.post(`${API_URL}/api/blogs/save-draft`, blog);
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }, []);

  // Publish a blog
  const publishBlog = useCallback(async (blog) => {
    try {
      const response = await axios.post(`${API_URL}/api/blogs/publish`, blog);
      return response.data;
    } catch (error) {
      console.error('Error publishing blog:', error);
      throw error;
    }
  }, []);

  // Get all blogs
  const getAllBlogs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }, []);

  // Get a blog by ID
  const getBlogById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog with id ${id}:`, error);
      throw error;
    }
  }, []);

  const value = {
    saveDraft,
    publishBlog,
    getAllBlogs,
    getBlogById,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};