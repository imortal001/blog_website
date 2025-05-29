import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash.debounce';
import { Save, Send } from 'lucide-react';
import { useBlogContext } from '../context/BlogContext';
import SaveIndicator from './SaveIndicator';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveDraft, publishBlog, getBlogById } = useBlogContext();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      if (id) {
        try {
          const blog = await getBlogById(id);
          if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setTags(blog.tags.join(', '));
          }
        } catch (error) {
          console.error('Error loading blog:', error);
        }
      }
    };
    
    loadBlog();
  }, [id, getBlogById]);

  const performSave = useCallback(async () => {
    if (title.trim() || content.trim()) {
      try {
        setSaveStatus('saving');
        const tagArray = tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '');
        
        await saveDraft({
          id: id || undefined,
          title,
          content,
          tags: tagArray,
          status: 'draft'
        });
        
        setSaveStatus('saved');
        
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      } catch (error) {
        console.error('Error saving draft:', error);
        setSaveStatus('idle');
      }
    }
  }, [title, content, tags, id, saveDraft]);

  const debouncedSave = useCallback(
    debounce(() => {
      performSave();
    }, 5000),
    [performSave]
  );

  useEffect(() => {
    if (title.trim() || content.trim()) {
      debouncedSave();
    }
    
    return () => {
      debouncedSave.cancel();
    };
  }, [title, content, debouncedSave]);

  const handleSave = async (e) => {
    e.preventDefault();
    debouncedSave.cancel();
    await performSave();
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please add a title before publishing');
      return;
    }
    
    if (!content.trim()) {
      alert('Please add content before publishing');
      return;
    }
    
    try {
      setIsPublishing(true);
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      await publishBlog({
        id: id || undefined,
        title,
        content,
        tags: tagArray,
        status: 'published'
      });
      
      navigate('/blogs');
    } catch (error) {
      console.error('Error publishing blog:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <SaveIndicator status={saveStatus} />
      </div>
      
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <div className="h-96 mb-4">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
              className="h-80"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="technology, programming, design"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="mr-2 h-4 w-4" />
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;