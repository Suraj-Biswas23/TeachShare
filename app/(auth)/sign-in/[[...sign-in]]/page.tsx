"use client";

import { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [userType, setUserType] = useState<"student" | "educator">("student");

  return (
    <div className="flex min-h-screen">
      <div
        className="w-4/5 bg-cover bg-center"
        style={{ backgroundImage: "url('/sign-in_bg.png')" }}
      >
        {/* This is the left side with the cover image */}
      </div>
      <div className="w-2/3 flex flex-col items-center justify-center bg-white p-8">
        <div className="mb-8 flex space-x-4">
          <Button
            className={userType === "student" ? "bg-blue-500 text-white" : ""}
            onClick={() => setUserType("student")}
          >
            Student Login
          </Button>
          <Button
            className={userType === "educator" ? "bg-blue-500 text-white" : ""}
            onClick={() => setUserType("educator")}
          >
            Educator Login
          </Button>
        </div>
        {userType === "student" ? (
          <div>
            {/* Render Student SignIn component */}
            <SignIn />
          </div>
        ) : (
          <div>
            {/* Render Educator SignIn component */}
            <SignIn />
          </div>
        )}
      </div>
    </div>
  );
}
