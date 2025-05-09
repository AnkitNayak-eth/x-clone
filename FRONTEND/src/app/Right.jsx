"use client";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import Avatar from "@/assets/avatar.png";
import { useState } from "react";
import Subscription from "@/components/Subscription";

export default function Right() {
  const [menuOpen, setMenuOpen] = useState(false);
  
    const handleMenuToggle = () => {
      console.log("Toggling menu");
      setMenuOpen(!menuOpen);
    };
  
    const handleClose = (e) => {
      if (e.target.id === "modal") {
        setMenuOpen(false);
      }
    };
  return (
    <div className="text-white p-4 w-full flex flex-col gap-2 ">
      <div className=" text-gray-400 rounded-full flex items-center px-2 py-2 w-full border border-gray-700">
        <GoSearch size={24} className="mr-4" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none w-full text-gray-400"
        />
      </div>

      <div className="rounded-3xl p-4 border border-gray-700 ">
        <h2 className="text-2xl font-semibold mb-2">Subscribe to Premium</h2>
        <p className="text-sm mb-4">
          Unlock new features and, if eligible, receive a share of revenue.
        </p>

        <button onClick={handleMenuToggle} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
          Subscribe
        </button>

      </div>

      {menuOpen && (
        <Subscription
          handleClose={handleClose}
          handleMenuToggle={handleMenuToggle}
        />
      )}

      <div className="rounded-3xl p-4 border border-gray-700 ">
        <h2 className="text-2xl font-semibold mb-2">What's happening</h2>
        <div className="trending-topic mb-2">
          <p className="font-semibold">Got Slapped By Teacher</p>
          <p className="text-sm text-gray-400">Trending in India</p>
        </div>
        <div className="trending-topic">
          <p className="font-semibold">आसाराम बापू</p>
          <p className="text-sm text-gray-400">17.5K posts</p>
        </div>

        <button className="text-blue-500 hover:underline">
          Show more
        </button>
      </div>

      <div className="rounded-3xl p-4 border border-gray-700 ">
        <div>
        <h2 className="text-2xl font-semibold mb-4">Who to follow</h2>

        {[
          { name: "Hyperfy", username: "@hyperfy_io" },
          { name: "Binance", username: "@binance" },
        ].map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-2 last:mb-0"
          >
            <div className="flex items-center gap-4">
              <Image src={Avatar} alt="username" width={50} height={50} />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.username}</p>
              </div>
            </div>
            <button className="bg-white text-black font-bold py-1 px-4 rounded-full hover:bg-gray-200">
              Follow
            </button>
          </div>
        ))}

        <button className="text-blue-500 hover:underline">
          Show more
        </button>
        </div>

        <div className="mt-2 text-gray-400 text-xs">
          <p className="flex gap-2">
            <span className="hover:underline cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:underline cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:underline cursor-pointer">
              Cookie Policy
            </span>
          </p>
          <p className="flex gap-2">
            <span className="hover:underline cursor-pointer">
              Accessibility
            </span>
            <span className="hover:underline cursor-pointer">Ads info</span>
            <span className="hover:underline cursor-pointer">More...</span>
          </p>
          <p className="mt-1">© 2025 X Corp.</p>
        </div>
      </div>
    </div>
  );
}
