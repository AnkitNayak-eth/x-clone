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
import UserEdit from "../../components/UserEdit";
import Post from "@/components/Post";
import Subscription from "@/components/Subscription";

export default function Profile() {
  const handleBack = () => {
    window.history.back();
  };

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

  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

  return (
    <section className="text-white flex-1 flex flex-col items-center border-l border-r border-gray-700">
      <div className="w-full">
        <div className="p-5 flex items-start gap-4 border-b border-gray-700 sticky top-0">
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
          <button
            onClick={handleMenuToggle}
            className="flex items-center gap-2 px-4 py-2 mt-28 border border-gray-700 text-white text-sm rounded-full hover:bg-blue-600 transition"
          >
            <FaUserEdit size={20} />
            Edit Profile
          </button>
        </div>
      </div>

      {menuOpen && (
        <UserEdit
          handleClose={handleClose}
          handleMenuToggle={handleMenuToggle}
        />
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

        <Post />
      </div>
    </section>
  );
}
