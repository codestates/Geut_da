const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const contents = require('./data/contents')
const users = require('./data/users')
const Content = require('./models/content')
const User = require('./models/user')

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
