import asyncHandler from 'express-async-handler';
import moment from 'moment';
import moment2 from 'moment-timezone';
import Content from '../models/content.js';

moment2.tz.setDefault('Asia/Seoul');
const now = new Date();

//  @desc    GET    user contents by month
//  @route   GET    /api/contents/by-month
//  @access  Private
const getContentsByMonth = asyncHandler(async (req, res) => {
  // 해당 유저의 년월별 그림일기 목록

  const year = req.query.year || now.getFullYear();
  const month = req.query.month || now.getMonth() + 1;

  const contents = await Content.find(
    {
      user: req.user._id, // 특정 유저의
      createdAt: {
        $gte: moment(`${year}/${month}`, 'YYYY/MM').startOf('month').format(),
        $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format(),
      }, // 원하는 기간
    },
    { title: 1, weather: 1, drawing: 1, createdAt: 1 } // 필요한 필드 선택(가공)
  )
    .sort({ createdAt: -1 })
    .exec();

  if (contents) {
    res.json(
      contents.map((el) => {
        return {
          ...el._doc,
          createdAt: moment(el.createdAt).format('YYYY년 MM월 DD일'),
        };
      })
    );
  } else {
    res.status(404).json({ message: 'Contents not found' });
  }
});

//  @desc    GET    user contents by hashtag
//  @route   GET    /api/contents/by-hashtag
//  @access  Private
const getContentsByHashtag = asyncHandler(async (req, res) => {
  // 해시태그별 그림일기 목록
  const contents = await Content.find(
    {
      user: req.user._id,
      hashtags: req.query.hashtag,
    },
    { title: 1, weather: 1, drawing: 1, createdAt: 1 }
  ).sort({ createdAt: -1 });

  if (contents) {
    res.json(
      contents.map((el) => {
        return {
          ...el._doc,
          createdAt: moment(el.createdAt).format('YYYY년 MM월 DD일'),
        };
      })
    );
  } else {
    res.status(404).json({ message: 'Contents not found' });
  }
});

//  @desc    GET    all hashtags
//  @route   GET    /api/contents/hashtags
//  @access  Private
const getHashtags = asyncHandler(async (req, res) => {
  // 해시태그 전체 목록

  const hashtags = await Content.distinct('hashtags', {
    user: req.user._id,
    hashtags: { $nin: ['', null] },
  });

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

  const content = await Content.findById(req.query._id, {
    user: 0,
    __v: 0,
    updatedAt: 0,
  }); // 필요없는 필드 제거

  if (content) {
    res.status(201).json(
      [content].map((el) => {
        return {
          ...el._doc,
          createdAt: moment(el.createdAt).format('YYYY년 MM월 DD일 HH:mm:ss'),
        };
      })[0]
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

  const updatedContent = await Content.findByIdAndUpdate(
    req.body._id,
    req.body,
    { projection: { user: 0, __v: 0, updatedAt: 0 }, new: true }
  );

  res.status(200).json(
    [updatedContent].map((el) => {
      return {
        ...el._doc,
        createdAt: moment(el.createdAt).format('YYYY년 MM월 DD일 HH:mm:ss'),
      };
    })[0]
  );
});

//  @desc   Create new Content
//  @route  Post  /api/contents/new
//  @access Private
const addContent = asyncHandler(async (req, res) => {
  // 그림일기 추가 요청

  const { title, text, weather, drawing } = req.body;

  if (!(title && text && weather && drawing)) {
    res.status(400).json({ message: 'Contents should be fulfilled' });
  } else {
    const content = new Content({
      user: req.user._id,
      ...req.body,
    });
    const createdContent = await content.save();

    res.status(201).json({ message: 'created', _id: createdContent._id });
  }
});

//  @desc    GET    total count
//  @route   GET    /api/contents/total
//  @access  Private
const getCount = asyncHandler(async (req, res) => {
  // 그림일기 총 개수
  // 월별 개수
  // 일별 개수

  const total = await Content.aggregate([
    {
      $match: {
        user: req.user._id,
      }, // 해당 유저의
    },
    {
      $group: {
        _id: 'total count',
        count: { $sum: 1 },
      }, // 유저 별 콘텐츠 총 합계
    },
  ]); // total[0].count = 13

  const totalByMonth = await Content.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: {
          $gte: new Date(now.getFullYear(), now.getMonth()),
        }, // 해당 월
      },
    },
    {
      $group: {
        _id: 'counts per month',
        count: { $sum: 1 },
      },
    },
  ]);

  const totalByDay = await Content.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $project: {
        createdOn: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
      },
    },
    {
      $group: { _id: '$createdOn', total: { $sum: 1 } },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    total: total[0].count,
    totalByMonth: totalByMonth[0].count,
    totalByDay,
  });
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
