import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import BlogView from './components/BlogView';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/blogs\" replace />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/new" element={<BlogEditor />} />
              <Route path="/blogs/edit/:id" element={<BlogEditor />} />
              <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;