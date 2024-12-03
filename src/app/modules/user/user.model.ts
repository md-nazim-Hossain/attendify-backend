import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, IUserModel } from './user.interface';
import { ENUM_USER_GENDER, ENUM_USER_STATUS } from '../../enums/user.enum';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../../config';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(ENUM_USER_GENDER),
    },
    dob: {
      type: String,
    },
    passwordChangeAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(ENUM_USER_STATUS),
      default: ENUM_USER_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  email: string
): Promise<Pick<
  IUser,
  'name' | 'password' | 'status' | '_id' | 'email'
> | null> {
  const user = await User.findOne(
    { email },
    {
      status: 1,
      _id: 1,
      password: 1,
      name: 1,
      email: 1,
    }
  ).lean();

  return user as IUser;
};

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword.trim(), hashedPassword);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password.trim(),
    Number(config.bcrypt.salt)
  );
  next();
});

userSchema.methods.generateAccessToken = function (role?: string) {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      status: this.status,
      role: role ?? 'user',
    },
    config.jwt.access_token_secret as Secret,
    {
      expiresIn: config.jwt.access_token_expiry,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    config.jwt.refresh_token_secret as Secret,
    {
      expiresIn: config.jwt.refresh_token_expiry,
    }
  );
};

export const User = model<IUser, IUserModel>('User', userSchema);
