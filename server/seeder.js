import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from './config/db';
import contents from './data/contents';
import users from './data/users';
import Content from './models/content';
import User from './models/user';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Content.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const samplecontents = contents.map((content) => {
      return { ...content, user: adminUser };
    });

    await Content.insertMany(samplecontents);
    console.log("Data imported!".green.inverse);
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

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// use it at the beginning of getting some initial data
// watch out for duplicate data
