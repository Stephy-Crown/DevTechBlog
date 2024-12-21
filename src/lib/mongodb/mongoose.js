// import mongoose from "mongoose";
// let initialized = false;

// export const connect = async () => {
//   mongoose.set("strictQuery", true);
//   if (initialized) {
//     console.log("Already Connected to mongoDB");
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "devtech-blog",
//       useNewUrlParser: true,
//       useUnifiedToplogy: true,
//       // yes
//     });
//     console.log("Already Connected to mongoDB");
//     initialized = true;
//   } catch (error) {
//     console.log("Error connecting to mongoDB");
//   }
// };

import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialized) {
    console.log("Already Connected to MongoDB");
    return;
  }

  try {
    // Make sure there's no space in the environment variable name.
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devtech-blog", // Replace this with your database name
      useNewUrlParser: true,
      useUnifiedTopology: true, // Fix spelling mistake: "useUnifiedToplogy" => "useUnifiedTopology"
    });

    console.log("Connected to MongoDB");
    initialized = true;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
