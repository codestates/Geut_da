import express from 'express';
import { get } from 'mongoose';
import {
  addContent,
  updateMyContent,
  deleteMyContent,
  getMyContents,
  getHashtag,
  addHashtag,
  deleteHashtag
  } from '../controllers/contentController';
import { protect } from '../middleware/auth';

const router = express.Router();

// endpoint => /api/contents
router.route('/').get(getMyContents);
router.route('/new').post(protect, addContent);
router.route('/edit').patch(protect, updateMyContent);
router.route('/delete').delete(protect, deleteMyContent);
router.route('/hashtag').get(getHashtag)
router.route('/hashtag/addHashtag').post(addHashtag)
router.route('/hashtag/delete').delete(deleteHashtag)

export default router;