// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
// import { clerkClient } from "@clerk/nextjs/server";

// export async function POST(req) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(WEBHOOK_SECRET);

//   // Get headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error: Missing Svix headers", {
//       status: 400,
//     });
//   }

//   // Get body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", {
//       status: 400,
//     });
//   }

//   // Do something with payload
//   const { id } = evt?.data;
//   const eventType = evt?.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log("Webhook payload:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { id, first_name, last_name, img_url, email_addresses, username } =
//       evt?.data;

//     try {
//       const user = await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         img_url,
//         email_addresses,
//         username
//       );

//       if (user && eventType === "user.created") {
//         try {
//           await clerkClient.users.updateUserMetadata(id, {
//             publicMetadata: {
//               userMongoId: user._id,
//               isAdmin: user.isAdmin,
//             },
//           });
//         } catch (error) {
//           console.log("Error updating user metadata", error);
//         }
//       }
//     } catch (error) {
//       console.log("Error creating or updating user", error);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt?.data;
//     try {
//       await deleteUser(id);
//     } catch (error) {
//       console.log("Error deleting user", error);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   return new Response("Webhook received", { status: 200 });
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
// import { clerkClient } from "@clerk/nextjs/server";

// export async function POST(req) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(WEBHOOK_SECRET);

//   // Get headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error: Missing Svix headers", {
//       status: 400,
//     });
//   }

//   // Get body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt;

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", {
//       status: 400,
//     });
//   }

//   // Do something with payload
//   const { id } = evt?.data;
//   const eventType = evt?.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log("Webhook payload:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { id, first_name, last_name, img_url, email_addresses, username } =
//       evt?.data;

//     if (!id || !first_name || !last_name) {
//       return new Response("Error: Missing required user data", { status: 400 });
//     }

//     try {
//       const user = await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         img_url,
//         email_addresses,
//         username
//       );

//       if (user && eventType === "user.created") {
//         try {
//           // Verify if the user exists in Clerk
//           const clerkUser = await clerkClient.users.getUser(id); // Verify user exists
//           console.log("Clerk user found:", clerkUser);

//           // Update metadata only if user exists
//           await clerkClient.users.updateUserMetadata(id, {
//             publicMetadata: {
//               userMongoId: user._id,
//               isAdmin: user.isAdmin,
//             },
//           });
//         } catch (error) {
//           console.log("Error updating user metadata", error.stack);
//         }
//       }
//     } catch (error) {
//       console.log("Error creating or updating user", error.stack);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt?.data;
//     try {
//       await deleteUser(id);
//     } catch (error) {
//       console.log("Error deleting user", error.stack);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   return new Response("Webhook received", { status: 200 });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("Error: Missing Svix headers");
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Extract the event type and log it
  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;

    if (!id || !first_name || !last_name) {
      console.log("Error: Missing required user data");
      return new Response("Error: Missing required user data", { status: 400 });
    }

    try {
      console.log(`Creating or updating user with ID ${id}`);
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      console.log(`User ${id} processed:`, user);

      if (user && eventType === "user.created") {
        try {
          // Verify if the user exists in Clerk
          console.log(`Verifying user ${id} in Clerk`);
          // const clerkUser = await clerkClient.users.updateUserMetadata(); // Verify user exists
          // console.log("Clerk user found:", clerkUser);

          // Update metadata only if user exists
          console.log(`Updating user metadata for ${id}`);
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });
        } catch (error) {
          console.log(
            "Error updating user metadata for user ID",
            id,
            error.stack
          );
        }
      }
    } catch (error) {
      console.log("Error creating or updating user", error.stack);
      return new Response("Error occurred", { status: 400 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt?.data;
    console.log(`User with ID ${id} is being deleted`);

    try {
      await deleteUser(id);
      console.log(`User ${id} successfully deleted`);
    } catch (error) {
      console.log("Error deleting user", error.stack);
      return new Response("Error occurred", { status: 400 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
