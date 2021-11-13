import express from 'express';
import {
  getContentsByMonth,
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
router.route('/by-month').get(protect, getContentsByMonth); // 월별 그림일기 목록
router.route('/by-hashtag').get(protect, getContentsByHashtag); // 해시태그별 그림일기 목록
router.route('/hashtags').get(protect, getHashtags); // 해시태그 전체 목록
router.route('/detail').get(protect, getContentDetail); // 해당 그림일기 정보 요청
router.route('/edit').patch(protect, updateMyContent); // 해당 그림일기 수정 요청
router.route('/delete').delete(protect, deleteMyContent); // 해당 그림일기 삭제 요청
router.route('/new').post(protect, addContent); // 새 그림일기 저장 요청
router.route('/total').get(protect, getCount); // 유저의 그림일기 총 수

export default router;
