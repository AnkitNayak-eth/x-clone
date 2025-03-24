"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/authSlice";

const SignUpForm = ({ handleClose, setShowSignIn, setShowSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, jwt } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ fullName: name, email, password })); // Fix: Use fullName
  };
  

  // Create safeHandleClose which always passes an event-like object.
  const safeHandleClose = (e) => {
    const evt = e || { target: { id: "modal" } };
    if (typeof handleClose === "function") {
      handleClose(evt);
    }
  };

  // Close the modal on successful sign-up using safeHandleClose
  useEffect(() => {
    if (jwt) {
      safeHandleClose();
    }
  }, [jwt]);

  // When clicking the backdrop, check if the target is the modal
  const handleModalClick = (event) => {
    if (event?.target?.id === "modal") {
      safeHandleClose(event);
    }
  };

  return (
    <div
      id="modal"
      onClick={handleModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up for X</h2>

        <button className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-700">
          Sign in with Google
        </button>
        <button className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded-md mb-4 hover:bg-gray-900">
          Sign in with Apple
        </button>

        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            className="text-blue-600 hover:underline ml-1"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
