import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, Clock, CheckCircle } from 'lucide-react';
import { useBlogContext } from '../context/BlogContext';
import { Blog } from '../types';

const BlogList: React.FC = () => {
  const { getAllBlogs } = useBlogContext();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts'>('all');
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, [getAllBlogs]);
  
  const filteredBlogs = blogs.filter(blog => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return blog.status === 'published';
    if (activeTab === 'drafts') return blog.status === 'draft';
    return true;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
        <Link
          to="/blogs/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New Blog
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'all'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'published'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'drafts'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Drafts
            </button>
          </nav>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <p>No blogs found. Create your first blog by clicking "New Blog".</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <li key={blog._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {blog.title || 'Untitled Blog'}
                    </h3>
                    <div className="mt-1 flex items-center">
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
                      <span className="ml-2 text-sm text-gray-500">
                        Last updated: {formatDate(blog.updatedAt)}
                      </span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap">
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
                  </div>
                  <div className="flex ml-4 space-x-2">
                    <Link
                      to={`/blogs/edit/${blog._id}`}
                      className="inline-flex items-center p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      aria-label="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-flex items-center p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      aria-label="View"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogList;