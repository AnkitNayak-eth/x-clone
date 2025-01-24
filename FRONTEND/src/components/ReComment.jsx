"use client";
import React, { useState } from "react";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import {
  RiAiGenerate,
  RiCalendarScheduleLine,
  RiFileGifLine,
} from "react-icons/ri";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";

export default function ReComment({ handleClose, handleMenuToggle }) {
  const [tweet, setTweet] = useState("");

  const handlePost = () => {
    if (tweet.trim()) {
      console.log("Tweet posted:", tweet);
      setTweet("");
    } else {
      alert("Tweet cannot be empty!");
    }
  };

  return (
    <div
      id="modal"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div className="bg-black w-full max-w-3xl shadow-lg p-5 flex flex-col border border-gray-700 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-700 sticky top-0 z-10 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-white text-lg rounded-full hover:bg-blue-600 transition">
            Save
          </button>
        </div>

        {/* Original Comment */}
        <div className="flex gap-4 w-full border-gray-700 p-5">
          <div className="flex-shrink-0">
            <Image
              src={Avatar}
              alt="username"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Sarthak</span>
              <span className="text-gray-500">@sarthakbaral_28 · just now</span>
            </div>

            <div className="mt-2 block">
              <p className="text-white text-xl">Rate my Portfolio website...</p>
            </div>
          </div>
        </div>

        {/* Reply Section */}
        <div className="flex gap-4 w-full p-5">
          <div className="flex-shrink-0">
            <Image
              src={Avatar}
              alt="username"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            {/* Textarea for Reply */}
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="What is happening?"
              className="w-full bg-inherit text-white text-xl resize-none outline-none placeholder-gray-500 p-2 rounded-md focus:ring-0 min-h-[100px] overflow-hidden"
            />

            {/* Icons and Post Button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-5 text-blue-500">
                {[
                  IoImageOutline,
                  RiFileGifLine,
                  RiAiGenerate,
                  MdOutlinePoll,
                  FaRegSmile,
                  RiCalendarScheduleLine,
                  IoLocationOutline,
                ].map((Icon, idx) => (
                  <button key={idx} className="hover:text-blue-400">
                    <Icon size={24} />
                  </button>
                ))}
              </div>
              <button
                onClick={handlePost}
                className={`bg-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-colors ${
                  tweet.trim()
                    ? "hover:bg-blue-600"
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!tweet.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}