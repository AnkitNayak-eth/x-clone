"use client";
import {
  IoArrowBack,
  IoImageOutline,
  IoLocationOutline,
  IoStatsChart,
} from "react-icons/io5";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import thumb from "@/assets/thumb.png";
import { FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6";
import {
  RiAiGenerate,
  RiCalendarScheduleLine,
  RiFileGifLine,
  RiHeart3Line,
  RiShare2Line,
} from "react-icons/ri";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
export default function Tweet() {
  const handleBack = () => {
    window.history.back();
  };
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
    <section className="text-white flex-1 flex flex-col items-center border-l border-r border-gray-700">
      <div className="w-full">
        <div className="p-5 flex items-start gap-4 border-b border-gray-700 sticky top-0 z-10">
          <IoArrowBack
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={handleBack}
            size={24}
          />
          <div>
            <h1 className="text-2xl font-bold">Post</h1>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex flex-col gap-4 w-full border-b border-gray-700 p-5">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Image src={Avatar} alt="username" width={50} height={50} />
              </div>
              <div className="flex flex-col text-xl">
                <span className="font-bold text-white">Sarthak</span>
                <span className="text-gray-500">@sarthakbaral_28</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-white text-xl mt-2">
                Rate my Portfolio website...
              </p>

              <div className="mt-4 border border-gray-700 rounded-3xl overflow-hidden">
                <Image
                  src={thumb}
                  alt="Tweet media"
                  width={500}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>

              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4">
                <span>11:20 AM · Jan 2, 2025 · </span>
                <span className="text-white font-bold">47 Views</span>
              </div>
              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4 flex gap-2">
                <IoStatsChart />
                <p className="text-white">View post engagements</p>
              </div>
              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4">
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
          {[1,1,1,1].map((item,index)=>(
          <div key={index} className="flex gap-4 w-full border-b border-gray-700 p-5">
          <div className="flex-shrink-0">
            <Image src={Avatar} alt="username" width={50} height={50} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Sarthak</span>
              <span className="text-gray-500">
                @sarthakbaral_28 · just now
              </span>
            </div>

            <Link href="/tweet" className="mt-2 block">
              <p className="text-white text-xl">
                Rate my Portfolio website...
              </p>
            </Link>

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
          ))}

        </div>
      </div>
    </section>
  );
}
