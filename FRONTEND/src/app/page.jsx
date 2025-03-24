"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import {
  RiFileGifLine,
  RiAiGenerate,
  RiCalendarScheduleLine,
} from "react-icons/ri";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { createTweet } from "@/store/tweetSlice";
import Post from "@/components/Post";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function Middle() {
  const [tweet, setTweet] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only images and videos are allowed.");
      return;
    }

    // Validate file size (50MB limit)
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxFileSize) {
      setError("File size exceeds the limit of 50MB.");
      return;
    }

    setMedia(file);
    setPreview(URL.createObjectURL(file));
    setError(null); // Clear any previous errors
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET); // Upload preset

    try {
      setUploading(true);
      console.log(
        `Uploading to: https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, // ✅ Correct URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setError("File upload failed. Please try again.");
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if (!tweet.trim() && !media) {
      setError("Tweet cannot be empty!");
      return;
    }

    let mediaUrl = "";
    if (media) {
      mediaUrl = await uploadToCloudinary(media);
      if (!mediaUrl) return; // Stop if upload fails
    }

    console.log("Tweet Content:", tweet);
    console.log("Media URL:", mediaUrl);
    dispatch(createTweet({ content: tweet, image: mediaUrl }));
    try {
      await axios.post(`${API_BASE_URL}/api/tweets/create`, {
        content: tweet,
        image: mediaUrl, // ✅ Use "image" field instead of "media"
      });

       // ✅ Use "image"
      setTweet("");
      setMedia(null);
      setPreview(null);
      setError(null); // Clear errors after successful post
    } catch (error) {
      console.error("Tweet post failed:", error);
      setError("Failed to post tweet. Try again.");
    }
  };

  return (
    <section className="text-white flex flex-col items-center border-l border-r border-gray-700">
      <div className="p-5 flex gap-4 w-full border-b border-gray-700">
        <div className="flex-shrink-0">
          <Image src={Avatar} alt="username" width={50} height={50} />
        </div>
        <div className="flex-1 flex flex-col">
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What is happening?"
            className="w-full bg-inherit text-white text-2xl resize-none outline-none placeholder-gray-500 p-2 rounded-md focus:ring-0 min-h-[30px] overflow-hidden"
          />
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="preview"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-5 text-blue-500">
              <label className="cursor-pointer">
                <IoImageOutline size={24} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </label>
              <RiFileGifLine size={24} />
              <RiAiGenerate size={24} />
              <MdOutlinePoll size={24} />
              <FaRegSmile size={24} />
              <RiCalendarScheduleLine size={24} />
              <IoLocationOutline size={24} />
            </div>
            <button
              onClick={handlePost}
              className={`bg-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-colors ${
                (tweet.trim() || media) && !uploading
                  ? "hover:bg-blue-600"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={(!tweet.trim() && !media) || uploading}
            >
              {uploading ? "Uploading..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      <Post />
    </section>
  );
}
