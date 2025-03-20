"use client";
import { SignUp } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center p-3">
      <SignUp
        appearance={{
          baseTheme: theme === "light" ? [light, light] : [dark, dark],
          // baseTheme: [dark, dark],
          variables: {
            colorPrimary: theme === "light" ? "" : "#2866e2",
            colorBackground: theme === "light" ? "#f9fafb" : "#283a50",
            colorText: theme === "light" ? "#374151" : "#e5e7eb",
          },
        }}
        // path="/sign-up"
      />
    </div>
  );
}

// "use client";
// import { SignIn } from "@clerk/nextjs";
// import { useTheme } from "next-themes";

// export default function Page() {
//   const { theme } = useTheme();

//   // Custom theme object for styling the SignIn component
//   const customTheme = {
//     variables: {
//       colorPrimary: "#6b7280", // Example: Tailwind's gray-600 color
//       colorBackground: theme === "light" ? "#f9fafb" : "#1f2937", // Light gray for light mode and dark gray for dark mode
//       colorText: theme === "light" ? "#374151" : "#e5e7eb", // Dark gray for light mode and light gray for dark mode
//     },
//     elements: {
//       formButtonPrimary: {
//         backgroundColor: "#6b7280", // Custom gray color for buttons
//         color: "#ffffff", // Text color on the button
//         hoverBackgroundColor: "#4b5563", // Darker gray on hover
//       },
//       card: {
//         backgroundColor: theme === "light" ? "#ffffff" : "#1f2937", // Card background color for light and dark themes
//         borderColor: theme === "light" ? "#e5e7eb" : "#374151", // Card border color for light and dark themes
//       },
//       headerTitle: {
//         color: theme === "light" ? "#374151" : "#f3f4f6", // Header title color
//       },
//       headerSubtitle: {
//         color: theme === "light" ? "#6b7280" : "#9ca3af", // Header subtitle color
//       },
//     },
//   };

//   return (
//     <SignIn
//       appearance={{
//         baseTheme: theme === "light" ? "light" : "dark",
//         ...customTheme,
//       }}
//       path="/sign-in"
//     />
//   );
// }
