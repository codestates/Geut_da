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
];

export default users;
