import mongoose from 'mongoose';

const hashtagSchema = mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Content',
  },
  tag: {
    type: String,
    trim: true,
    // required: true,
  },
});

const contentSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', contentSchema);
const Hashtag = mongoose.model('Hashtag', hashtagSchema)

export { Content, Hashtag }