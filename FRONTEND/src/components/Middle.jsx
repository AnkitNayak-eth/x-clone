"use client";
import Avatar from "@/assests/avatar.png";
import Image from "next/image";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { RiFileGifLine, RiAiGenerate } from "react-icons/ri";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";

export default function Middle() {
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
    <div className="text-white p-5 rounded-lg flex items-start gap-4 shadow-lg">
      <div className="flex items-center">
        <Image
          src={Avatar}
          alt="username"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder="What is happening?"
          className="w-full bg-inherit text-white text-2xl resize-none outline-none placeholder-gray-500 p-2 focus:ring-0 focus:outline-none min-h-[30px] overflow-hidden rounded-md"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-5 text-blue-500">
            <button className="hover:text-blue-400">
              <IoImageOutline size={24} />
            </button>
            <button className="hover:text-blue-400">
              <RiFileGifLine size={24} />
            </button>
            <button className="hover:text-blue-400">
              <RiAiGenerate size={24} />
            </button>
            <button className="hover:text-blue-400">
              <MdOutlinePoll size={24} />
            </button>
            <button className="hover:text-blue-400">
              <FaRegSmile size={24} />
            </button>
            <button className="hover:text-blue-400">
              <RiCalendarScheduleLine size={24} />
            </button>
            <button className="hover:text-blue-400">
              <IoLocationOutline size={24} />
            </button>
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
  );
}
