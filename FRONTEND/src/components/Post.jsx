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
  const [loading, setLoading] = useState(true);
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [likedTweets, setLikedTweets] = useState({});
  const [RetweetTweets, setRetweetTweets] = useState({});
  const [publicTweets, setPublicTweets] = useState([]);

  const dispatch = useDispatch();
  const { tweets, error } = useSelector((state) => state.tweet);
  const { setShowSignIn, showSignUp } = useContext(AppContext);

  const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  const tweetsToRender = jwt ? tweets : publicTweets;

  // Fetch tweets on load or auth change
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setLoading(true);

    if (!jwt && !showSignUp) {
      setShowSignIn(true);
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tweets/`)
        .then((res) => res.json())
        .then((data) => {
          setPublicTweets(data);
        })
        .catch((err) => {
          console.error("Error fetching public tweets:", err);
          setShowSignIn(true);
        })
        .finally(() => setLoading(false));
    } else if (jwt) {
      dispatch(getAllTweets()).finally(() => setLoading(false));
    }
  }, [dispatch, showSignUp, setShowSignIn]);

  // React to changes in localStorage (login/logout in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const jwt = localStorage.getItem("jwt");
      setLoading(true);

      if (!jwt) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tweets/`)
          .then((res) => res.json())
          .then((data) => {
            setPublicTweets(data);
          })
          .catch((err) => console.error("Error fetching public tweets:", err))
          .finally(() => setLoading(false));
      } else {
        dispatch(getAllTweets()).finally(() => setLoading(false));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem("jwt");
      dispatch(logout());
      setShowSignIn(true);
    }
  }, [error, dispatch, setShowSignIn]);

  const requireAuth = (callback) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setShowSignIn(true);
      return;
    }
    callback();
  };

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setMenuOpen(false);
      setSelectedTweetId(null);
    }
  };

  const handleLike = (tweetId) => {
    requireAuth(() => {
      setLikedTweets((prev) => ({ ...prev, [tweetId]: !prev[tweetId] }));
      dispatch(likeTweet(tweetId))
        .unwrap()
        .then(() => dispatch(getAllTweets()));
    });
  };

  const handleRetweet = (tweetId) => {
    requireAuth(() => {
      setRetweetTweets((prev) => ({ ...prev, [tweetId]: !prev[tweetId] }));
      dispatch(createReTweet(tweetId))
        .unwrap()
        .then(() => dispatch(getAllTweets()));
    });
  };

  const handleMenuToggle = (tweetId) => {
    requireAuth(() => {
      setSelectedTweetId(tweetId);
      setMenuOpen(!menuOpen);
    });
  };

  const handleDelete = (tweetId) => {
    requireAuth(() => {
      dispatch(deleteTweet(tweetId)).then(() => dispatch(getAllTweets()));
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {tweetsToRender && Array.isArray(tweetsToRender) && tweetsToRender.length > 0 ? (
        tweetsToRender.map((tweet) => {
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
                  <p className="text-white text-l">{tweet.content}</p>
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
