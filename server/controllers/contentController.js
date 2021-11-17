import asyncHandler from 'express-async-handler';
import moment from 'moment';
import Content from '../models/content.js';

const now = new Date();

//  @desc    GET    all user drawings
//  @route   GET    /api/contents/all
//  @access  Private
const getAllDrawings = asyncHandler(async (req, res) => {
  const drawings = await Content.find(
    {
      user: req.user._id,
    },
    { _id: 0, drawing: 1 }
  ).exec();

  if (drawings) {
    res.json(drawings);
  } else {
    res.status(404).json({ message: 'Drawings not found' });
  }
});

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
        $gte: moment(`${year}/${month}`, 'YYYY/MM')
          .startOf('month')
          .toISOString(),
        $lte: moment(`${year}/${month}`, 'YYYY/MM')
          .endOf('month')
          .toISOString(),
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

//  @desc    GET    user contents by date
//  @route   GET    /api/contents/by-date
//  @access  Private
const getContentsByDate = asyncHandler(async (req, res) => {
  // 해당 유저의 일별 그림일기 목록
  const { year, month, date } = req.query;

  const contents = await Content.find(
    {
      user: req.user._id,
      createdAt: {
        $gte: new Date(`${year}, ${month}, ${date}`),
        $lte: moment(`${year}/${month}/${date}`, 'YYYY/MM/DD')
          .endOf('day')
          .toISOString(),
      },
    },
    {
      title: 1,
      weather: 1,
      drawing: 1,
      createdAt: 1,
    }
  ).exec();

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
    {
      title: 1,
      weather: 1,
      drawing: 1,
      createdAt: 1,
    }
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
//  @route   GET    /api/contents
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
//  @route   Delete    /api/contents
//  @access  Private
const deleteMyContent = asyncHandler(async (req, res) => {
  // 해당 그림일기 삭제

  await Content.findByIdAndDelete(req.body._id);
  res.status(200).json({
    message: 'Delete success',
  });
});

//  @desc   update   user content
//  @route  PATCH   /api/contents
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
//  @route  Post  /api/contents
//  @access Private
const addContent = asyncHandler(async (req, res) => {
  // 그림일기 추가 요청

  const { title, text, drawing } = req.body;

  if (!(title && text && drawing)) {
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
  // 그림일기 총/월별/일별 개수

  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

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
  ]);

  const totalByMonth = await Content.aggregate([
    {
      $match: {
        user: req.user._id,
        createdAt: {
          $gte: new Date(year, month),
        },
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
        createdAt: {
          $gte: new Date(year - 1, month, date),
        },
      },
    },
    {
      $project: {
        createdOn: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
            timezone: 'Asia/Seoul', // 한국 시간으로
          },
        },
      },
    },
    {
      $group: { _id: '$createdOn', count: { $sum: 1 } },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
    { $sort: { date: -1 } },
  ]);

  res.json({
    total: total[0].count,
    totalByMonth: totalByMonth[0].count,
    totalByDay,
  });
});

export {
  getAllDrawings,
  getContentsByMonth,
  getContentsByDate,
  getContentsByHashtag,
  getHashtags,
  getContentDetail,
  addContent,
  updateMyContent,
  deleteMyContent,
  getCount,
};
