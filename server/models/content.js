import mongoose from 'mongoose';

const hashtagSchema = mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Content',
  },
  tags: {
    type: String,
    // required: true,
  },
});

const contentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  drawing: {
    type: String,
    required: true,
  },
  hashtags: [hashtagSchema],
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
