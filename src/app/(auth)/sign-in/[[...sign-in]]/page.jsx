// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }
"use client";
import { SignIn } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center p-3">
      <SignIn
        appearance={{
          baseTheme: theme === "light" ? [light, light] : [dark, dark],
          // baseTheme: [dark, dark],
          variables: {
            colorPrimary: theme === "light" ? "" : "#9dc2f5",
            colorBackground: theme === "light" ? "#f9fafb" : "#5a77a0",
            colorText: theme === "light" ? "#374151" : "#e5e7eb",
          },
        }}
        path="/sign-in"
      />
    </div>
  );
}
