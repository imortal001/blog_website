import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { Blog, BlogInput } from '../types';

interface BlogContextType {
  saveDraft: (blog: BlogInput) => Promise<Blog>;
  publishBlog: (blog: BlogInput) => Promise<Blog>;
  getAllBlogs: () => Promise<Blog[]>;
  getBlogById: (id: string) => Promise<Blog>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// API URL
const API_URL = 'http://localhost:5000';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Save or update a blog draft
  const saveDraft = useCallback(async (blog: BlogInput): Promise<Blog> => {
    try {
      const response = await axios.post(`${API_URL}/blogs/save-draft`, blog);
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }, []);

  // Publish a blog
  const publishBlog = useCallback(async (blog: BlogInput): Promise<Blog> => {
    try {
      const response = await axios.post(`${API_URL}/blogs/publish`, blog);
      return response.data;
    } catch (error) {
      console.error('Error publishing blog:', error);
      throw error;
    }
  }, []);

  // Get all blogs
  const getAllBlogs = useCallback(async (): Promise<Blog[]> => {
    try {
      const response = await axios.get(`${API_URL}/blogs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }, []);

  // Get a blog by ID
  const getBlogById = useCallback(async (id: string): Promise<Blog> => {
    try {
      const response = await axios.get(`${API_URL}/blogs/${id}`);
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

export const useBlogContext = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};