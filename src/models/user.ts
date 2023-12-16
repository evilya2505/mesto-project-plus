import mongoose from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

// --- Описание схемы пользователя ---
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    default: 'Жак-Ив-Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v: string) {
        return v.match(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        );
      },
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(v: string) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 3,
  },
});

export default mongoose.model<IUser>('user', userSchema);
