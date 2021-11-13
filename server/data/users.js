import bcrypt from 'bcryptjs';

const users = [
  {
    nickname: 'Cheolsoo',
    email: 'soo@example.com',
    password: bcrypt.hashSync('asdf1234!', 10),
    image: '/images/user.jpeg',
  },
  {
    nickname: 'Younghee',
    email: 'hee@example.com',
    password: bcrypt.hashSync('asdf1234!', 10),
    image: '/images/user.jpeg',
  },
  {
    nickname: 'ADMIN',
    email: '1',
    password: bcrypt.hashSync('1',1),
    image: '/images/user.jpeg'
  }
];

export default users;
