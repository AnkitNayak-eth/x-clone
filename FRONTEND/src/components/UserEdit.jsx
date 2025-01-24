"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";
import Cover from "@/assets/cover.jpg";

export default function UserEdit({ handleClose, handleMenuToggle }) {
  const [dob, setDob] = useState(new Date());

  return (
    <div
      id="modal"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="bg-black w-full max-w-3xl rounded-lg shadow-lg p-5 flex flex-col border border-gray-700">
        <div className="flex items-center justify-between gap-4 border-b border-gray-700 sticky top-0 z-10 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Edit</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-white text-lg rounded-full hover:bg-blue-600 transition">
            Save
          </button>
        </div>

        <div className="relative w-full mb-6">
          <Image
            src={Cover}
            alt="Cover"
            width={1500}
            height={500}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-full px-5">
            <div className="border-4 border-black rounded-full overflow-hidden">
              <Image
                src={Avatar}
                alt="Avatar"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              className="block w-full px-4 py-3 text-white bg-transparent border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
          </div>

          <div className="relative">
            <textarea
              id="bio"
              className="block w-full px-4 py-3 text-white bg-transparent border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[120px]"
              placeholder=" "
            />
            <label
              htmlFor="bio"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Bio
            </label>
          </div>

          {[
            { id: "location", label: "Location", type: "text" },
            { id: "website", label: "Website", type: "url" },
          ].map((input) => (
            <div key={input.id} className="relative">
              <input
                type={input.type}
                id={input.id}
                className="block w-full px-4 py-3 text-white bg-transparent border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer"
                placeholder=" "
              />
              <label
                htmlFor={input.id}
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                {input.label}
              </label>
            </div>
          ))}

          <div className="relative">
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              className="block w-full px-4 py-3 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Date of Birth"
              popperClassName="z-50"
              wrapperClassName="w-full"
            />
            <label
              htmlFor="dob"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Date of Birth
            </label>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-xl font-medium text-gray-400">
              Display confirmed phone number mark
            </span>
            <label className="inline-flex items-center cursor-pointer">
              <input id="phoneMark" type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
