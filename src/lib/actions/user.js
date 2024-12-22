// import { clerkClient } from "@clerk/nextjs/dist/types/server";
// import User from "../models/user.model";
// import { connect } from "../mongodb/mongoose";

// export const createOrUpdateUser = async (
//   id,
//   first_name,
//   last_name,
//   img_url,
//   email_addresses,
//   username
// ) => {
//   try {
//     await connect();

//     const user = await User.findOneAndUpdate(
//       { clerkId: id },
//       {
//         $set: {
//           firstName: first_name,
//           lastName: last_name,
//           email: email_addresses[0].email_address,
//           profilePicture: img_url,
//           username: username,
//         },
//       },
//       { new: true, upsert: true }
//     );

//     return user;
//   } catch (error) {
//     console.error("Error creating or updating user", error);
//   }
// };

// export const deleteUser = async () => {
//   try {
//     await connect();
//     await User.findOneAndDelete({ clerkId: id });
//   } catch (error) {
//     console.error("Error deleting user", error);
//   }
// };

import User from "../models/user.model";

import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  profile_image_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    // / Default profile picture if none is provided
    const profilePic = profile_image_url;
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: profilePic,
          email: email_addresses[0].email_address || "no-email@example.com",
          username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};
