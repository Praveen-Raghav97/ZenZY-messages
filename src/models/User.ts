import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  isVarified: boolean;
  verifyCodeExpiry:Date;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verifyCode: {
      type: String,
      required: [true, "Verify code is required"],
    },
    isVarified: {
      type: Boolean,
      required: [true, "Verified code is required"],
      default: false,
    },
   verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify codeExpiary is required"],
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },

    message: [],
  },
  {}
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
