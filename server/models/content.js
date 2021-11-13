import mongoose from 'mongoose';

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
      type: Number,
      required: true,
      default: 0,
    },
    drawing: {
      type: String,
      required: true,
    },
    hashtags: [{ type: String }],
  },
  { timestamps: true }
);

const Content = mongoose.model('Content', contentSchema);

export default Content;
