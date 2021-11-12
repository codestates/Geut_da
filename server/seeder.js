import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import contents from './data/contents.js';
import users from './data/users.js';
import hashtags from './data/hashtags.js';
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

    const createContents = await Content.insertMany(sampleContents);

    const adminContent = createContents[0]._id;
    const sampleHashtags = hashtags.map((hashtag) => {
      return { ...hashtag, content: adminContent };
    });
    await Hashtag.insertMany(sampleHashtags);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
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
