"use client";

import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById } from "@/store/tweetSlice";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import {
  IoArrowBack,
  IoImageOutline,
  IoLocationOutline,
  IoStatsChart,
} from "react-icons/io5";

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
import Comments from "@/components/Comments";

export default function Tweet({ params }) {
  const unwrappedParams = use(params); // ✅ Use React.use() to unwrap the promise
  const { id } = unwrappedParams; // ✅ Now you can safely access `id`

  const selectedTweet = useSelector((state) => state.tweet);
  const [tweet, setTweet] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(findTweetsById(id));
    }
  }, [id, dispatch]);

  console.log("Selected Tweet:", selectedTweet);

  const handleBack = () => {
    window.history.back();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

    const maxFileSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxFileSize) {
      setError("File size exceeds the limit of 50MB.");
      return;
    }

    setMedia(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
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
      if (!mediaUrl) return;
    }

    try {
      dispatch(createTweetReply({ tweetId, content: tweet, image: mediaUrl })); // ✅ Correct Redux action
      setTweet("");
      setMedia(null);
      setPreview(null);
      setError(null);
      handleClose({ target: { id: "modal" } });
      dispatch(getAllTweets());
    } catch (error) {
      console.error("Tweet post failed:", error);
      setError("Failed to post tweet. Try again.");
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
                <Image src={Avatar} alt="user avatar" width={50} height={50} />
              </div>
              <div className="flex flex-col text-xl">
                <span className="font-bold text-white">
                  {selectedTweet?.tweet?.user?.fullName || "Unknown"}
                </span>
                <span className="text-gray-500">
                  @{selectedTweet?.tweet?.user?.email || "unknown@example.com"}
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-white text-xl mt-2">
                {selectedTweet?.tweet?.content || "No content available."}
              </p>
              {selectedTweet?.tweet?.image && (
                <div className="mt-4 border border-gray-700 rounded-3xl overflow-hidden">
                  <Image
                    src={selectedTweet.tweet.image}
                    alt="Tweet media"
                    width={500}
                    height={300}
                    className="rounded-lg w-full"
                  />
                </div>
              )}
              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4">
                <span>
                  {new Date(selectedTweet?.tweet?.createdAt).toLocaleString() ||
                    "Time unknown"}{" "}
                  ·{" "}
                </span>
                <span className="text-white font-bold">
                  {selectedTweet?.tweet?.totalLikes || 0} Views
                </span>
              </div>
              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4 flex gap-2">
                <IoStatsChart />
                <p className="text-white">View post engagements</p>
              </div>
              <div className="text-gray-500 text-xl mt-4 border-b border-gray-700 pb-4">
                <div className="mt-4 flex items-center justify-between text-gray-400">
                  <button className="flex items-center gap-2 hover:text-blue-400">
                    <FaRegComment size={24} />
                    <span>{selectedTweet?.tweet?.totalReplies || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400">
                    <FaRetweet size={24} />
                    <span>{selectedTweet?.tweet?.totalRetweets || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-pink-400">
                    <RiHeart3Line size={24} />
                    <span>{selectedTweet?.tweet?.totalLikes || 0}</span>
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
          </div>
        </div>
        <Comments selectedTweet={selectedTweet} />
      </div>
    </section>
  );
}
