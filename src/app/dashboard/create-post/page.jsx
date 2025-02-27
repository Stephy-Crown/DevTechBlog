import React from "react";
import { useUser } from "@clerk/nextjs";

const CreatePostPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) {
    return null;
  }
  if (isSignedIn && user.publicMetadata.isAdmin) {
    return <div>Create post</div>;
  } else {
    <h1 className="text-center text-3xl font-semibold my-7">
      You are not authorized to view this page
    </h1>;
  }
};

export default CreatePostPage;
