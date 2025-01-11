"use client";
import Avatar from "@/assests/avatar.png";
import thumb from "@/assests/thumb.png";
import Image from "next/image";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { RiFileGifLine, RiAiGenerate } from "react-icons/ri";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { RiHeart3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";

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
    <section className="text-white flex flex-col items-center border-l border-r border-gray-700">
      <div className="p-5 flex gap-4 w-full">
        <div className="flex-shrink-0">
        <Image src={Avatar} alt="username" width={50} height={50} />
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
            className="w-full bg-inherit text-white text-2xl resize-none outline-none placeholder-gray-500 p-2 rounded-md focus:ring-0 min-h-[30px] overflow-hidden"
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

      {[1, 1, 1, 1].map((item, index) => (
        <div key={index} className="p-5 w-full border-t border-gray-700">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
            <Image src={Avatar} alt="username" width={50} height={50} />
            </div>

            <div className="flex-1">
              <div className="text-lg">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Sarthak</span>
                  <span className="text-gray-500">
                    @sarthakbaral_28 · just now
                  </span>
                </div>
                <p className="mt-2 text-white">
                  Every shot taken at yoyo honey Singh in Baawe song and vdo
                </p>
              </div>

              <div className="mt-4 border border-gray-700 rounded-3xl overflow-hidden">
                <Image
                  src={thumb}
                  alt="Tweet media"
                  width={500}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-gray-400">
                <button className="flex items-center gap-2 hover:text-blue-400">
                  <FaRegComment size={24} />
                  <span>0</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-400">
                  <FaRetweet size={24} />
                  <span>0</span>
                </button>
                <button className="flex items-center gap-2 hover:text-pink-400">
                  <RiHeart3Line size={24} />
                  <span>0</span>
                </button>
                <button className="flex items-center gap-2 hover:text-gray-300">
                  <IoStatsChart size={24} />
                  <span>0</span>
                </button>
                <div className="flex gap-4">
                  <button className="hover:text-gray-300">
                    <FaRegBookmark size={24} />
                  </button>
                  <button className="hover:text-gray-300">
                    <RiShare2Line size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}