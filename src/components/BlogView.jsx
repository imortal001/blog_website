import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft, Calendar, Tag, Clock, CheckCircle } from 'lucide-react';
import { useBlogContext } from '../context/BlogContext';

const BlogView = () => {
  const { id } = useParams();
  const { getBlogById } = useBlogContext();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, getBlogById]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">Blog not found.</p>
        <Link to="/blogs" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to blogs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link to="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to blogs
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {blog.title || 'Untitled Blog'}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(blog.createdAt)}
                </span>
                
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {blog.status === 'published' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {blog.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            
            <Link
              to={`/blogs/edit/${blog._id}`}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center mb-6 flex-wrap">
              <Tag className="h-4 w-4 text-gray-400 mr-2" />
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogView;