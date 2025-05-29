import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenSquare, LayoutList } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PenSquare className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">BlogSpace</span>
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link
              to="/blogs"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/blogs' 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              <LayoutList className="h-4 w-4 mr-1" />
              Blogs
            </Link>
            <Link
              to="/blogs/new"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/blogs/new' 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              <PenSquare className="h-4 w-4 mr-1" />
              New Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;