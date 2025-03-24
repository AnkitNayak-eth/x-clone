import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiHeart3Line, RiShare2Line } from "react-icons/ri";
import Avatar from "@/assets/avatar.png";
import PostComment from "@/components/PostComment";

export default function Comments({ selectedTweet }) {
  return (
    <div>
      {selectedTweet?.tweet?.replyTweets?.map((reply, index) => (
        <div key={index} className="flex gap-4 w-full border-b border-gray-700 p-5">
          <div className="flex-shrink-0">
            <Image src={reply.user?.image || Avatar} alt={reply.user?.fullName || "User"} width={50} height={50} />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{reply.user?.fullName || "Unknown"}</span>
              <span className="text-gray-500">@{reply.user?.email?.split("@")[0]} · {new Date(reply.createdAt).toLocaleTimeString()}</span>
            </div>
            <Link href="/tweet" className="mt-2 block">
              <p className="text-white text-xl">{reply.content}</p>
            </Link>
            <div className="mt-4 flex items-center justify-between text-gray-400">
              <button className="flex items-center gap-2 hover:text-blue-400">
                <FaRegComment size={24} />
                <span>{reply.totalReplies}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-400">
                <FaRetweet size={24} />
                <span>{reply.totalRetweets}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-pink-400">
                <RiHeart3Line size={24} />
                <span>{reply.totalLikes}</span>
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
