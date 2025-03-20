"use client"; // Mark as Client Component

import { useUser, redirectToSignIn } from "@clerk/nextjs";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill, disabling SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Since this is a Client Component, we can rely on useUser and client-side redirects
const CreatePostPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  // Show a loading state until Clerk data is ready
  if (!isLoaded) {
    return (
      <div className="text-center my-7">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated (client-side only)
  if (!isSignedIn) {
    redirectToSignIn();
    return null; // Return null while redirecting (won't render anything)
  }

  // Check if the user is an admin
  const isAdmin = user?.publicMetadata?.isAdmin;

  if (!isAdmin) {
    return (
      <h1 className="text-center text-3xl font-semibold my-7">
        You are not authorized to view this page
      </h1>
    );
  }

  // Render the form for admins
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
