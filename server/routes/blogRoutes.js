import express from 'express';
import { saveDraft, publishBlog, getBlogs, getBlogById } from '../controllers/blogController.js';

const router = express.Router();

router.post('/save-draft', saveDraft);

// POST /api/blogs/publish - Save and publish an article
router.post('/publish', publishBlog);

router.get('/', getBlogs);

router.get('/:id', getBlogById);

export default router;