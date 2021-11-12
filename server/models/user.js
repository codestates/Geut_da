import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      minlength: [2, '닉네임은 2글자 이상 입력해주세요.'],
      maxlength: [10, '닉네임은 11글자 미만이여야 합니다.'],
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, '이메일 형식에 맞게 작성해주세요'],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, '비밀번호를 8자 이상 입력해주세요.'],
      matches: {
        options: [
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
          '비밀번호 형식에 맞지않습니다.',
        ],
      },
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.pawssword, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
