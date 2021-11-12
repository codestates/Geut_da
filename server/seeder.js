import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import contents from './data/contents.js';
import users from './data/users.js';
import { Content, Hashtag } from './models/content.js';
import User from './models/user.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Hashtag.deleteMany();
    await Content.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const sampleContents = contents.map((content) => {
      return { ...content, user: adminUser };
    });

    const createContents = await Content.insertMany(sampleContents); // 콘텐츠 생성
    // 각 콘텐츠의 _id를 연결
    for (let newContent of createContents) {
      const adminContent = newContent._id;
      const sampleHashtags = newContent.hashtags.map((hashtag) => {
        return { tag: hashtag, content: adminContent };
      });
      await Hashtag.insertMany(sampleHashtags);
    }
    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Hashtag.deleteMany();
    await Content.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// use it at the beginning of getting some initial data
// watch out for duplicate data
