import mongoose from "mongoose";
let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("Already Connected to mongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB - URI, {
      dbName: "devtech-blog",
      useNewUrlParser: true,
      useUnifiedToplogy: true,
    });
    console.log("Already Connected to mongoDB");
    initialized = true;
  } catch (error) {
    console.log("Error connecting to mongoDB");
  }
};
