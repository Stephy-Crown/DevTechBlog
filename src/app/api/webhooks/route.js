// // import { Webhook } from "svix";
// // import { headers } from "next/headers";
// // import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
// // import { clerkClient } from "@clerk/nextjs/server";

// // export async function POST(req) {
// //   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// //   if (!WEBHOOK_SECRET) {
// //     throw new Error(
// //       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
// //     );
// //   }

// //   // Create new Svix instance with secret
// //   const wh = new Webhook(WEBHOOK_SECRET);

// //   // Get headers
// //   const headerPayload = headers();
// //   const svix_id = headerPayload.get("svix-id");
// //   const svix_timestamp = headerPayload.get("svix-timestamp");
// //   const svix_signature = headerPayload.get("svix-signature");

// //   // If there are no headers, error out
// //   if (!svix_id || !svix_timestamp || !svix_signature) {
// //     return new Response("Error: Missing Svix headers", {
// //       status: 400,
// //     });
// //   }

// //   // Get body
// //   const payload = await req.json();
// //   const body = JSON.stringify(payload);

// //   let evt;

// //   // Verify payload with headers
// //   try {
// //     evt = wh.verify(body, {
// //       "svix-id": svix_id,
// //       "svix-timestamp": svix_timestamp,
// //       "svix-signature": svix_signature,
// //     });
// //   } catch (err) {
// //     console.error("Error: Could not verify webhook:", err);
// //     return new Response("Error: Verification error", {
// //       status: 400,
// //     });
// //   }

// //   // Do something with payload
// //   const { id } = evt?.data;
// //   const eventType = evt?.type;
// //   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
// //   console.log("Webhook payload:", body);

// //   if (eventType === "user.created" || eventType === "user.updated") {
// //     const { id, first_name, last_name, img_url, email_addresses, username } =
// //       evt?.data;

// //     try {
// //       const user = await createOrUpdateUser(
// //         id,
// //         first_name,
// //         last_name,
// //         img_url,
// //         email_addresses,
// //         username
// //       );

// //       if (user && eventType === "user.created") {
// //         try {
// //           await clerkClient.users.updateUserMetadata(id, {
// //             publicMetadata: {
// //               userMongoId: user._id,
// //               isAdmin: user.isAdmin,
// //             },
// //           });
// //         } catch (error) {
// //           console.log("Error updating user metadata", error);
// //         }
// //       }
// //     } catch (error) {
// //       console.log("Error creating or updating user", error);
// //       return new Response("Error occurred", { status: 400 });
// //     }
// //   }

// //   if (eventType === "user.deleted") {
// //     const { id } = evt?.data;
// //     try {
// //       await deleteUser(id);
// //     } catch (error) {
// //       console.log("Error deleting user", error);
// //       return new Response("Error occurred", { status: 400 });
// //     }
// //   }

// //   return new Response("Webhook received", { status: 200 });
// // }

// // import { Webhook } from "svix";
// // import { headers } from "next/headers";
// // import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
// // import { clerkClient } from "@clerk/nextjs/server";

// // export async function POST(req) {
// //   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// //   if (!WEBHOOK_SECRET) {
// //     throw new Error(
// //       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
// //     );
// //   }

// //   // Create new Svix instance with secret
// //   const wh = new Webhook(WEBHOOK_SECRET);

// //   // Get headers
// //   const headerPayload = headers();
// //   const svix_id = headerPayload.get("svix-id");
// //   const svix_timestamp = headerPayload.get("svix-timestamp");
// //   const svix_signature = headerPayload.get("svix-signature");

// //   // If there are no headers, error out
// //   if (!svix_id || !svix_timestamp || !svix_signature) {
// //     return new Response("Error: Missing Svix headers", {
// //       status: 400,
// //     });
// //   }

// //   // Get body
// //   const payload = await req.json();
// //   const body = JSON.stringify(payload);

// //   let evt;

// //   // Verify payload with headers
// //   try {
// //     evt = wh.verify(body, {
// //       "svix-id": svix_id,
// //       "svix-timestamp": svix_timestamp,
// //       "svix-signature": svix_signature,
// //     });
// //   } catch (err) {
// //     console.error("Error: Could not verify webhook:", err);
// //     return new Response("Error: Verification error", {
// //       status: 400,
// //     });
// //   }

// //   // Do something with payload
// //   const { id } = evt?.data;
// //   const eventType = evt?.type;
// //   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
// //   console.log("Webhook payload:", body);

// //   if (eventType === "user.created" || eventType === "user.updated") {
// //     const { id, first_name, last_name, img_url, email_addresses, username } =
// //       evt?.data;

// //     if (!id || !first_name || !last_name) {
// //       return new Response("Error: Missing required user data", { status: 400 });
// //     }

// //     try {
// //       const user = await createOrUpdateUser(
// //         id,
// //         first_name,
// //         last_name,
// //         img_url,
// //         email_addresses,
// //         username
// //       );

// //       if (user && eventType === "user.created") {
// //         try {
// //           // Verify if the user exists in Clerk
// //           const clerkUser = await clerkClient.users.getUser(id); // Verify user exists
// //           console.log("Clerk user found:", clerkUser);

// //           // Update metadata only if user exists
// //           await clerkClient.users.updateUserMetadata(id, {
// //             publicMetadata: {
// //               userMongoId: user._id,
// //               isAdmin: user.isAdmin,
// //             },
// //           });
// //         } catch (error) {
// //           console.log("Error updating user metadata", error.stack);
// //         }
// //       }
// //     } catch (error) {
// //       console.log("Error creating or updating user", error.stack);
// //       return new Response("Error occurred", { status: 400 });
// //     }
// //   }

// //   if (eventType === "user.deleted") {
// //     const { id } = evt?.data;
// //     try {
// //       await deleteUser(id);
// //     } catch (error) {
// //       console.log("Error deleting user", error.stack);
// //       return new Response("Error occurred", { status: 400 });
// //     }
// //   }

// //   return new Response("Webhook received", { status: 200 });
// // }

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
//     console.log("Error: Missing Svix headers");
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

//   // Extract the event type and log it
//   const { id } = evt?.data;
//   const eventType = evt?.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log("Webhook payload:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { id, first_name, last_name, image_url, email_addresses, username } =
//       evt?.data;

//     if (!id || !first_name || !last_name) {
//       console.log("Error: Missing required user data");
//       return new Response("Error: Missing required user data", { status: 400 });
//     }

//     try {
//       console.log(`Creating or updating user with ID ${id}`);
//       const user = await createOrUpdateUser(
//         id,
//         first_name,
//         last_name,
//         image_url,
//         email_addresses,
//         username
//       );
//       console.log(`User ${id} processed:`, user);

//       if (user && eventType === "user.created") {
//         try {
//           // Verify if the user exists in Clerk
//           console.log(`Verifying user ${id} in Clerk`);
//           // const clerkUser = await clerkClient.users.updateUserMetadata(); // Verify user exists
//           // console.log("Clerk user found:", clerkUser);

//           // Update metadata only if user exists
//           console.log(`Updating user metadata for ${id}`);
//           await clerkClient.users.updateUserMetadata(id, {
//             publicMetadata: {
//               userMongoId: user._id,
//               isAdmin: user.isAdmin,
//             },
//           });
//         } catch (error) {
//           console.log(
//             "Error updating user metadata for user ID",
//             id,
//             error.stack
//           );
//         }
//       }
//     } catch (error) {
//       console.log("Error creating or updating user", error.stack);
//       return new Response("Error occurred", { status: 400 });
//     }
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt?.data;
//     console.log(`User with ID ${id} is being deleted`);

//     try {
//       await deleteUser(id);
//       console.log(`User ${id} successfully deleted`);
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
  // 1. Webhook Secret Verification
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // 2. Get and Verify Headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing Svix headers");
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // 3. Get and Verify Payload
  let evt;
  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    console.log("Webhook body:", body);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Webhook verification failed", {
      status: 400,
    });
  }

  // 4. Process Events
  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Processing ${eventType} webhook for user ${id}`);

  // Handle user creation and updates
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;

    // Validate required data
    if (!id) {
      console.error("Missing user ID in webhook data");
      return new Response("Error: Missing user ID", { status: 400 });
    }

    try {
      // Step 1: Create/Update in MongoDB
      console.log(
        `Step 1: ${
          eventType === "user.created" ? "Creating" : "Updating"
        } user in MongoDB...`
      );
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      console.log("MongoDB operation successful:", user);

      // Step 2: Verify Clerk User
      console.log("Step 2: Verifying user in Clerk...");
      const clerkUser = await clerkClient.users.getUser(id);
      console.log("Clerk user verified:", clerkUser.id);

      // Step 3: Update Clerk Metadata
      console.log("Step 3: Updating Clerk metadata...");
      const metadataUpdate = await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userMongoId: user._id.toString(),
          isAdmin: user.isAdmin || false,
          lastUpdated: new Date().toISOString(),
          eventType: eventType, // Track what caused the update
        },
      });
      console.log("Metadata update successful:", metadataUpdate.publicMetadata);

      return new Response(
        JSON.stringify({
          success: true,
          operation: eventType,
          userId: id,
          mongoId: user._id.toString(),
          metadata: metadataUpdate.publicMetadata,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error processing user:", {
        eventType,
        userId: id,
        error: error.message,
        stack: error.stack,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          eventType,
          userId: id,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Handle user deletion
  if (eventType === "user.deleted") {
    try {
      console.log(`Processing deletion for user ${id}`);
      await deleteUser(id);
      console.log(`Successfully deleted user ${id}`);

      return new Response(
        JSON.stringify({
          success: true,
          operation: "deleted",
          userId: id,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error deleting user:", {
        userId: id,
        error: error.message,
        stack: error.stack,
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          userId: id,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Handle any other events
  return new Response(
    JSON.stringify({
      success: true,
      message: "Webhook received",
      eventType,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
