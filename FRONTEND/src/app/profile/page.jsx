"use client";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";

export default function Profile() {
  const handleBack = () => {
    window.history.back(); // Navigates to the previous page
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95 px-4 py-3 shadow-md">
        <IoArrowBack
          className="cursor-pointer text-2xl hover:text-gray-600"
          onClick={handleBack}
        />
        <h1 className="text-xl font-bold opacity-90 ml-5">Ankit</h1>
      </div>

      {/* Profile Card */}
      <div className="max-w-lg mx-auto mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        {/* Cover Photo */}
        <div className="relative">
          <Image
            src="/cover-photo.jpg" // Replace with your cover photo URL in the public folder
            alt="Cover Photo"
            width={600}
            height={150}
            className="w-full h-36 object-cover"
            priority
          />
          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-5 border-4 border-white rounded-full">
            <Image
              src="/avatar.jpg" // Replace with your avatar URL in the public folder
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full"
              priority
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 pt-16 pb-6">
          <h2 className="text-2xl font-bold">Ankit.eth</h2>
          <p className="text-gray-500">@AnkitNayak_eth</p>
          <button className="mt-3 px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600">
            Get verified
          </button>

          <p className="mt-4">
            <strong>23</strong> | Full-Stack Developer | Web3 Enthusiast | Entrepreneur | Digital Artist | Coder
          </p>
          <p className="text-gray-500 mt-2">
            Software developer/Programmer/Software engineer · Metaverse
          </p>
          <a
            href="https://linktr.ee/ankit_nayak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            linktr.ee/ankit_nayak
          </a>
          <p className="text-gray-500 mt-2">Born September 22, 2000</p>
          <p className="text-gray-500">Joined September 2018</p>

          {/* Stats */}
          <div className="flex gap-6 mt-4 text-gray-700">
            <span>
              <strong>258</strong> Following
            </span>
            <span>
              <strong>550</strong> Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
