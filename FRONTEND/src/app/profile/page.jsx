"use client";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";
import Cover from "@/assets/cover.jpg";
import { IoArrowBack, IoStatsChart } from "react-icons/io5";
import {
  RiHeart3Line,
  RiShare2Line,
  RiVerifiedBadgeLine,
} from "react-icons/ri";
import { PiSuitcaseSimpleDuotone } from "react-icons/pi";
import { AiOutlineLink } from "react-icons/ai";
import { PiBalloonLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import thumb from "@/assets/thumb.png";
import { useState } from "react";
import { FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

export default function Profile() {
  const handleBack = () => {
    window.history.back();
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

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
            <h1 className="text-2xl font-bold">Ankit.eth</h1>
            <p className="text-sm text-gray-500">1,028 posts</p>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <Image
          src={Cover}
          alt="Cover"
          width={1500}
          height={500}
          className="w-full h-64 object-cover"
        />
        <div className="absolute -bottom-12 px-5 flex items-center justify-between w-full">
          <div className="border-4 border-black rounded-full">
            <Image
              src={Avatar}
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 mt-28 border border-gray-700 text-white text-sm rounded-full hover:bg-blue-600 transition">
            <FaUserEdit size={20} />
            Edit Profile
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute w-full -mt-20">
          <button
            onClick={handleMenuToggle}
            className="bg-black text-white border text-2xl font-bold p-4 w-3/4 rounded-full"
          >
            Logout
          </button>
        </div>
      )}

      <div className="px-6 pt-16 pb-6 w-full">
        <div className="flex gap-8">
          <h2 className="text-3xl font-bold">Ankit.eth</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-white text-sm rounded-full hover:bg-blue-600 transition">
            <RiVerifiedBadgeLine size={20} />
            Get verified
          </button>
        </div>

        <p className="text-xl text-gray-500">@AnkitNayak_eth</p>

        <p className="mt-2 text-xl">
          23 | Full-Stack Developer | Web3 Enthusiast | Entrepreneur | Digital
          Artist | Coder
        </p>
        <div className="flex flex-col text-xl gap-2">
          <div className="text-gray-500 mt-2 flex gap-4">
            <div className="flex gap-2 items-center">
              <PiSuitcaseSimpleDuotone size={20} color="white" />
              <p>Software Developer/Programmer/Software Engineer</p>
            </div>
            <div className="flex gap-2 items-center">
              <IoLocationOutline size={20} color="white" />
              <p>Metaverse</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <AiOutlineLink size={20} />
              <a
                href="https://linktr.ee/ankit_nayak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                linktr.ee/ankit_nayak
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <PiBalloonLight size={20} />
              <p className="text-gray-500">Born September 22, 2000</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <SlCalender size={20} />
            <p className="text-gray-500">Joined September 2018</p>
          </div>
        </div>

        <div className="flex gap-6 mt-4 text-gray-400 text-xl">
          <div>
            <span className="text-white">258</span> Following
          </div>
          <div>
            <span className="text-white">550</span> Followers
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex justify-around border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-lg ${
                activeTab === tab
                  ? "text-white border-blue-600 font-bold border-b-2"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "Posts" && (
            <div>
              {[1, 1, 1, 1].map((item, index) => (
                <div
                  key={index}
                  className="p-5 w-full border-b border-gray-700"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={Avatar}
                        alt="username"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Sarthak</span>
                          <span className="text-gray-500">
                            @sarthakbaral_28 · just now
                          </span>
                        </div>
                      </div>

                      <div>
                        <Link href="/tweet">
                          <div className="block">
                            <p className="mt-2 text-white text-xl">
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
                          </div>
                        </Link>
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
            </div>
          )}
          {activeTab === "Replies" && <p>Here are your replies!</p>}
          {activeTab === "Highlights" && <p>Here are your highlights!</p>}
          {activeTab === "Articles" && <p>Here are your articles!</p>}
          {activeTab === "Media" && <p>Here is your media!</p>}
          {activeTab === "Likes" && <p>Here are your likes!</p>}
        </div>
      </div>
    </section>
  );
}
