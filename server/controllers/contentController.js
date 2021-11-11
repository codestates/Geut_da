import asyncHandler from 'express-async-handler';
import moment from 'moment';
import moment2 from 'moment-timezone';
import Content from '../models/content.js';
import Hashtag from '../models/content.js';

moment2.tz.setDefault('Asia/Seoul');

//  @desc    GET    user contents
//  @route   GET    /api/contents
//  @access  Private
const getMyContents = asyncHandler(async (req, res) => {
  //본인의 전체 컨텐츠 요청
  const contents = await Content.find({ user: req.user._id})
      .populate('user', ['nickname', 'image'])
      .sort({ createdAt: 1 })
      .exec();
    if(contents) {
      res.status(201).json(contents.map(el => {
        return {...el._doc, createdAt : moment(el.createdAt)}
      }));
    } else {
      res.status(404);
      throw new Error('Contents not found');
    }
});

//  @desc    Delete    user post
//  @route   Delete    /api/content/delete
//  @access  Private
const deleteMyContent = asyncHandler(async (req, res) => {
  // 본인 게시물 삭제 요청
  await Content.deleteOne({ _id: req.body._id });
  res.status(200).json({
    message: 'Delete success',
  });
});

//  @desc   update own content
//  @route  PATCH /api/content/edit
//  @access Private
const updateMyContent = asyncHandler(async (req, res) => {
  // 본인 게시물 수정 요청
  const updatedContent = await Content.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContent)
  // if (content) {
  //   content.title = req.body.title || content.title;
  //   content.text = req.body.text || content.text;
  //   content.weather = req.body.weather || content.weather;
  //   content.drawing = req.body.drawing || content.drawing;
  //   content.hashtag = req.body.hashtag || content.hashtag;

  //   const updatedContent = await content.save();

  //   res.json({
  //     _id : updatedContent._id,
  //     user: updatedContent.user,
  //     title: updatedContent.title,
  //     text: updatedContent.text,
  //     weather: updatedContent.weather,
  //     drawing: updatedContent.drawing,
  //     hashtag: updatedContent.hashtag,
  //     updatedAt: moment(updatedContent.updatedAt).format(),
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error('Content not found');
  // }
});


//  @desc Create new Content
//  @route  Post  /api/content/new
//  @access Private
const addContent = asyncHandler(async (req, res) => {
  // 컨텐츠 추가를 요청
  // req.body로 들어온 회원정보 이용.
  const { title, text, weather, drawing, hashtag } = req.body;

  if (!(title && text && weather && drawing)) {
    res.status(400);
    throw new Error('There is no content');
  } else {
    const content = new Content({
      user: req.user._id,
      ...req.body,
    })

    const createdContent = await content.save();
    res.status(201).json(createdContent);
  }
});

//  @desc    GET    select hashtag
//  @route   GET    /api/content/hashtag
//  @access  Public
const getHashtag = asyncHandler(async (req, res) => {
  // 선택한 해쉬태그 요청
  const hashtag = await Hashtag.find({ content: req.content._id })
      .populate('tag')
      .sort({ tag: 1 })
      .exec();
    if(hashtag) {
      res.status(201).json(hashtag.map(el => {
        return {...el._doc, createdAt : moment(el.createdAt)}
      }));
    } else {
      res.status(404);
      throw new Error('Contents not found');
    }
});

//  @desc Create new Hashtag
//  @route  Post  /api/hashtag/new
//  @access Public
const addHashtag = asyncHandler(async (req, res) => {
  // 해쉬태그 추가
  // req.body로 들어온게 tag 밖에 없을 거임

  if (!req.body.tag) {
    res.status(400);
    throw new Error('There is no Hashtag');
  } else {
    const hashtag = new Hashtag({
      tag: req.body.tag
    })

    const createdHashtag = await hashtag.save();
    res.status(201).json(createdHashtag);
  }
});

//  @desc    Delete    hashtag
//  @route   Delete    /api/hashtag/delete
//  @access  Public
const deleteHashtag = asyncHandler(async (req, res) => {
  // 해쉬태그 삭제 요청
  const hashtag = await Hashtag.find({ tag: req.body.tag })
  if (!hashtag)
  await Hashtag.deleteOne({ _id: req.body._id });
  res.status(200).json({
    message: 'Delete success',
  });
});


export { addContent, updateMyContent, deleteMyContent, getMyContents, getHashtag, addHashtag, deleteHashtag }