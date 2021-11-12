import asyncHandler from 'express-async-handler';
import moment from 'moment';
import moment2 from 'moment-timezone';
import { Content, Hashtag } from '../models/content.js';

moment2.tz.setDefault('Asia/Seoul');

//  @desc    GET    user contents by month
//  @route   GET    /api/contents/by-month
//  @access  Private
const getContentsByMonth = asyncHandler(async (req, res) => {
  // 월별 그림일기 목록
  const now = new Date();
  let year = req.body.year || now.getFullYear();
  let month = req.body.month || now.getMonth() + 1;
  const contents = await Content.find({
    updatedAt: {
      $gte: moment(`${year}/${month}`, 'YYYY/MM').startOf('month').format(),
      $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format(),
    },
  })
    .sort({ createdAt: 1 })
    .exec();

  if (contents) {
    res.json(contents);
  } else {
    res.status(404).json({ message: 'Contents not found' });
  }
});

//  @desc    GET    user contents by hashtag
//  @route   GET    /api/contents/by-hashtag
//  @access  Private
const getContentsByHashtag = asyncHandler(async (req, res) => {
  // 해시태그별 그림일기 목록
  const contents = await Content.find({ hashtags: req.body.hashtag });

  if (contents) {
    res.json(contents);
  } else {
    res.status(404).json({ message: 'Contents not found' });
  }
});

//  @desc    GET    all hashtags
//  @route   GET    /api/contents/hashtags
//  @access  Private
const getHashtags = asyncHandler(async (req, res) => {
  // 해시태그 전체 목록
  const hashtags = await Hashtag.find({});

  if (hashtags) {
    res.json(hashtags);
  } else {
    res.status(404).json({ message: 'hashtags not found' });
  }
});

//  @desc    GET    content detail
//  @route   GET    /api/contents/detail
//  @access  Private
const getContentDetail = asyncHandler(async (req, res) => {
  // 해당 그림일기 정보
  const content = await Content.findById(req.body._id);

  if (content) {
    res.status(201).json(
      content.map((el) => {
        return { ...el._doc, createdAt: moment(el.createdAt) };
      })
    );
  } else {
    res.status(404).json({ message: 'Contents not found' });
  }
});

//  @desc    Delete    user content
//  @route   Delete    /api/contents/delete
//  @access  Private
const deleteMyContent = asyncHandler(async (req, res) => {
  // 해당 그림일기 삭제
  // 그림일기 삭제 전 연결된 해시태그 지운다.
  await Hashtag.deleteMany({ content: req.body._id });
  await Content.findByIdAndDelete(req.body._id);
  res.status(200).json({
    message: 'Delete success',
  });
});

//  @desc   update   user content
//  @route  PATCH   /api/contents/edit
//  @access Private
const updateMyContent = asyncHandler(async (req, res) => {
  // 해당 그림일기 수정
  // 수정 후 해시태그 또한 수정
  const updatedContent = await Content.findByIdAndUpdate(
    req.body._id,
    req.body,
    {
      new: true,
    }
  ); // 콘텐츠 수정 후 고유 아이디 바뀌는 지 확인할 것! 바뀌면 낭패
  const { hashtags } = req.body;
  if (hashtags.length) {
    await Hashtag.deleteMany({ content: req.body._id }); // 해당 그림일기의 해시태그 싹 지우고
    for (let tag of hashtags) {
      await Hashtag.create({ content: updatedContent._id, tag });
    } // 다시 생성한다.
  }
  res.status(200).json(updatedContent);
});

//  @desc   Create new Content
//  @route  Post  /api/contents/new
//  @access Private
const addContent = asyncHandler(async (req, res) => {
  // 그림일기 추가 요청
  // req.body로 들어온 회원정보 이용.
  const { title, text, weather, drawing } = req.body;

  if (!(title && text && weather && drawing)) {
    res.status(400).json({ message: 'Contents should be fulfilled' });
  } else {
    const content = new Content({
      user: req.user._id,
      ...req.body,
    });
    const createdContent = await content.save();
    // 그림일기를 생성 후 해당 그림일기의 고유번호로 해시태그 생성
    // 중복되는 태그들이 있겠지만, 해시태그 고유번호로 구분한다.
    const { hashtags } = req.body;
    if (hashtags.length) {
      for (let tag of hashtags) {
        await Hashtag.create({ content: createdContent._id, tag });
      }
    }
    res.status(201).json(createdContent);
  }
});

//  @desc    GET    total count
//  @route   GET    /api/contents/total
//  @access  Private
const getCount = asyncHandler(async (req, res) => {
  // 유저가 작성한 그림일기 총 개수
  await Content.find({}).aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
});

export {
  getContentsByMonth,
  getContentsByHashtag,
  getHashtags,
  getContentDetail,
  addContent,
  updateMyContent,
  deleteMyContent,
  getCount,
};
