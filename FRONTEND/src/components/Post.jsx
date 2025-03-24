"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRegBookmark, FaRegComment, FaRetweet } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiHeart3Fill, RiHeart3Line, RiShare2Line } from "react-icons/ri";
import Avatar from "@/assets/avatar.png";
import { useContext, useEffect, useState } from "react";
import PostComment from "@/components/PostComment";
import { useDispatch, useSelector } from "react-redux";
import {
  createReTweet,
  deleteTweet,
  getAllTweets,
  likeTweet,
} from "@/store/tweetSlice";
import { logout } from "@/store/authSlice";
import { MdDelete } from "react-icons/md";
import { AppContext } from "@/app/Providers";

export default function Post() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Local loading state
  const dispatch = useDispatch();
  const { tweets, error } = useSelector((state) => state.tweet);
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const { setShowSignIn } = useContext(AppContext);
  const [likedTweets, setLikedTweets] = useState({});
  const [RetweetTweets, setRetweetTweets] = useState({});

  useEffect(() => {
    setLoading(true); // Show preloader
    dispatch(getAllTweets()).finally(() => setLoading(false)); // Fetch tweets and hide preloader

    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  const handleMenuToggle = (tweetId) => {
    setSelectedTweetId(tweetId); // Set the selected tweet ID
    setMenuOpen(!menuOpen); // Toggle the menu
  };

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setMenuOpen(false);
      setSelectedTweetId(null);
    }
  };

  const handleLike = (tweetId) => {
    setLikedTweets((prev) => ({ ...prev, [tweetId]: !prev[tweetId] }));
    dispatch(likeTweet(tweetId))
      .unwrap()
      .then(() => {
        dispatch(getAllTweets()); // Fetch only when API call succeeds
      });
};


  const handleRetweet = (tweetId) => {
    setRetweetTweets((prev) => ({
      ...prev,
      [tweetId]: !prev[tweetId], // Toggle UI instantly
    }));
    dispatch(createReTweet(tweetId))
      .unwrap()
      .then(() => {
        dispatch(getAllTweets()); // Fetch only when API call succeeds
      });
  };

  const handleDelete = (tweetId) => {
    dispatch(deleteTweet(tweetId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    setShowSignIn(true);
  }

  return (
    <div className="w-full flex flex-col">
      {tweets && Array.isArray(tweets) && tweets.length > 0 ? (
        tweets.map((tweet) => {
          const isLiked = likedTweets[tweet.id] ?? tweet.liked;
          const isRetweet = RetweetTweets[tweet.id] ?? tweet.retweet;
  
          return (
            <div
              key={tweet.id}
              className="flex gap-4 w-full border-b border-gray-700 p-5"
            >
              <div className="flex-shrink-0">
                <Image
                  src={tweet.user?.image || Avatar}
                  alt="username"
                  width={50}
                  height={50}
                  className="rounded-full"
                  priority
                />
              </div>
  
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">
                      {tweet.user?.fullName || "Anonymous"}
                    </span>
                    <span className="text-gray-500">
                      @{tweet.user?.email || "anonymous"} ·{" "}
                      {new Date(tweet.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
  
                  <button
                    onClick={() => handleDelete(tweet.id)}
                    className="text-gray-400 hover:text-red-500 transition duration-200"
                  >
                    <MdDelete size={30} />
                  </button>
                </div>
  
                <Link href={`/tweet/${tweet.id}`} className="mt-2 block">
                  <p className="text-white text-xl">{tweet.content}</p>
                  {tweet.image && (
                    <div className="mt-4 border border-gray-700 rounded-3xl overflow-hidden">
                      <Image
                        src={tweet.image}
                        alt="Tweet media"
                        width={500}
                        height={300}
                        className="rounded-lg w-full"
                        priority
                      />
                    </div>
                  )}
                </Link>
  
                <div className="mt-4 flex items-center justify-between text-gray-400">
                  <button
                    onClick={() => handleMenuToggle(tweet.id)}
                    className="flex items-center gap-2 hover:text-blue-400"
                  >
                    <FaRegComment size={24} />
                    <span>{tweet.totalReplies || 0}</span>
                  </button>
  
                  {menuOpen && selectedTweetId === tweet.id && (
                    <PostComment
                      tweetId={selectedTweetId}
                      handleClose={handleClose}
                    />
                  )}
  
                  <button
                    onClick={() => handleRetweet(tweet.id)}
                    className="flex items-center gap-2 hover:text-green-400 transition-transform duration-300 active:scale-110"
                  >
                    {isRetweet ? (
                      <FaRetweet size={24} className="text-green-500" />
                    ) : (
                      <FaRetweet size={24} />
                    )}
                    <span>{tweet.totalRetweets || 0}</span>
                  </button>
  
                  <button
                    onClick={() => handleLike(tweet.id)}
                    className="flex items-center gap-2 hover:text-pink-400"
                  >
                    {isLiked ? (
                      <RiHeart3Fill size={24} className="text-pink-500" />
                    ) : (
                      <RiHeart3Line size={24} />
                    )}
                    <span>{tweet.totalLikes || 0}</span>
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
          );
        })
      ) : (
        <p className="text-gray-500 text-center py-4">No tweets available</p>
      )}
    </div>
  );
  
}
