"use client";

import { useState, useEffect } from "react";
import { SignIn, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userType, setUserType] = useState<"student" | "educator">("student");
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {isLoaded && !isSignedIn ? (
        <>
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
                <SignIn/>
              </div>
            ) : (
              <div>
                <SignIn />
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}