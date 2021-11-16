import express from 'express';
import {
  getContentsByMonth,
  getContentsByDate,
  getContentsByHashtag,
  getHashtags,
  getContentDetail,
  updateMyContent,
  deleteMyContent,
  addContent,
  getCount,
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/contents
router
  .route('/')
  .get(protect, getContentDetail)
  .post(protect, addContent)
  .patch(protect, updateMyContent)
  .delete(protect, deleteMyContent);
router.route('/by-month').get(protect, getContentsByMonth); // 월별 그림일기 목록
router.route('/by-date').get(protect, getContentsByDate); // 일별 그림일기 목록
router.route('/by-hashtag').get(protect, getContentsByHashtag); // 해시태그별 그림일기 목록
router.route('/hashtags').get(protect, getHashtags); // 해시태그 전체 목록
router.route('/total').get(protect, getCount); // 유저의 그림일기 총 수

export default router;
