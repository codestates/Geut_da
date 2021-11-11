const bcrypt = require("bcryptjs");

const users = [
  {
    nickname: "Cheolsoo",
    email: "soo@example.com",
    password: bcrypt.hashSync("asdf1234!", 10),
    image: "/images/users/1.jpeg",
  },
  {
    nickname: "Younghee",
    email: "hee@example.com",
    password: bcrypt.hashSync("asdf1234!", 10),
    image: "/images/users/2.jpeg",
  },
];

export default users;