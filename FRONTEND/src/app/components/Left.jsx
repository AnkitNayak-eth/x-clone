"use client";
import { FaXTwitter } from "react-icons/fa6";
import { navigationMenu } from "../constants/navigation";
import Link from "next/link";
import Avatar from "@/app/assests/avatar.png";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function Left() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    console.log("Logged out!");
  };

  return (
    <div className="h-screen sticky">
      <div className="py-4">
        <FaXTwitter size={40} />
      </div>
      <div className="flex flex-col">
        {navigationMenu.map((item, index) => (
          <Link key={index} href={item.path} legacyBehavior>
            <div className="flex items-center">
              <div className="cursor-pointer flex gap-4 py-3 items-center hover:bg-[rgb(24,24,24)] rounded-full">
                {item.icon}
                <p className="text-2xl">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="py-4">
        <button className="bg-white text-black text-2xl font-bold p-4 w-3/4 rounded-full">
          Post
        </button>
      </div>
      {menuOpen && (
        <div className="absolute w-full -mt-20">
          <button
            onClick={handleLogout}
            className="bg-black text-white border text-2xl font-bold p-4 w-3/4 rounded-full"
          >
            Logout
          </button>
        </div>
      )}
      <div
        className="flex items-center justify-between mt-8 cursor-pointer"
        onClick={handleMenuToggle}
      >
        <div className="flex items-center gap-3">
          <Image src={Avatar} alt="username" width={50} height={50} />
          <div>
            <p className="font-bold text-xl">Ankit.eth</p>
            <p className="text-gray-500">@AnkitNayak_eth</p>
          </div>
          <div>
            <BsThreeDots size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
