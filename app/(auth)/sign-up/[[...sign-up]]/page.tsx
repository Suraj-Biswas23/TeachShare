import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <div className="w-4/5 bg-cover bg-center" style={{ backgroundImage: "url('sign-in_bg.png')" }}>
        {/* This is the left side with the cover image */}
      </div>
      <div className="w-2/3 flex items-center justify-center bg-white">
        <SignUp />
      </div>
    </div>
  );
}