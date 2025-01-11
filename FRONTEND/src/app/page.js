"use client";

import Left from "@/app/Left";
import Middle from "@/app/Middle";
import Right from "@/app/Right";
import Profile from "@/app/profile/page";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname(); // Get the current route

  return (
    <>
      <div className="flex flex-wrap px-5 lg:px-24 justify-between">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-2/12 w-full relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Left />
          </div>
        </div>

        {/* Middle Content (Switch between Middle and Profile dynamically based on the route) */}
        <div className="w-full lg:w-7/12 px-5 lg:px-9 relative overflow-auto">
          {pathname === "/profile" ? <Profile /> : <Middle />}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:w-3/12 w-full relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Right />
          </div>
        </div>
      </div>
    </>
  );
}
