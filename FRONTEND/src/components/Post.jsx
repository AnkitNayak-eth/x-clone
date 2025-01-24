"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiHeart3Line, RiShare2Line } from "react-icons/ri";
import Avatar from "@/assets/avatar.png";
import thumb from "@/assets/thumb.png";
import { useState } from "react";
import ReComment from "./ReComment";

export default function Post() {
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
    <div className="w-full flex flex-col">
      {[1, 1, 1, 1].map((item, index) => (
        <div
          key={index}
          className="flex gap-4 w-full border-b border-gray-700 p-5"
        >
          <div className="flex-shrink-0">
            <Image src={Avatar} alt="username" width={50} height={50} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Sarthak</span>
              <span className="text-gray-500">@sarthakbaral_28 · just now</span>
            </div>

            <Link href="/tweet" className="mt-2 block">
              <p className="text-white text-xl">Rate my Portfolio website...</p>
              <div className="mt-4 border border-gray-700 rounded-3xl overflow-hidden">
                <Image
                  src={thumb}
                  alt="Tweet media"
                  width={500}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
            </Link>

            <div className="mt-4 flex items-center justify-between text-gray-400">
              <button
                onClick={handleMenuToggle}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaRegComment size={24} />
                <span>0</span>
              </button>
              {menuOpen && (
                <ReComment
                  handleClose={handleClose}
                  handleMenuToggle={handleMenuToggle}
                />
              )}
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
  );
}
