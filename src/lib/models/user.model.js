import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      undefined: true,
    },
    email: {
      type: String,
      required: true,
      undefined: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("mongoose", userShema);
export default User;
