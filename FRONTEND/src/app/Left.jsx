"use client";
import { useContext, useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { navigationMenu } from "../constants/navigation";
import Link from "next/link";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout, initializeAuth } from "@/store/authSlice";
import { AppContext } from "@/app/Providers";

export default function Left() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { setShowSignIn } = useContext(AppContext);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const [menuOpen, setMenuOpen] = useState(false);
  const userName = user?.fullName || "";

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthAction = () => {
    if (user) {
      dispatch(logout());
    } else {
      setShowSignIn(true);
    }
  };

  return (
    <div className="h-screen sticky">
      <div className="py-4">
        <FaXTwitter size={40} />
      </div>
      <div className="flex flex-col">
  {navigationMenu.map((item, index) => (
    <div
      key={index}
      className="cursor-pointer flex gap-4 p-2 items-center hover:bg-[rgb(24,24,24)] rounded-full"
      onClick={(e) => {
        if (!user) {
          e.preventDefault();
          setShowSignIn(true);
        } else {
          window.location.href = item.path;
        }
      }}
    >
      {item.icon}
      <p className="text-2xl">{item.title}</p>
    </div>
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
            onClick={handleAuthAction}
            className="bg-black text-white border text-2xl font-bold p-4 w-3/4 rounded-full"
          >
            {user ? "Logout" : "Sign In"}
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
            <p className="font-bold text-xl">{userName}</p>
            <p className="text-gray-500">
              {userName.replace(/\s+/g, "_").toLowerCase()}
            </p>
          </div>
          <div>
            {menuOpen ? (
              <IoIosCloseCircleOutline size={30} />
            ) : (
              <BsThreeDots size={30} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}