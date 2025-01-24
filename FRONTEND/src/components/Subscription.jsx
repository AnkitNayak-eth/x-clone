"use client";
import React from "react";
import { FaCheck} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Subscription({ handleClose, handleMenuToggle }) {
  return (
    <div
      id="modal"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div className="bg-black w-full max-w-3xl rounded-lg shadow-lg p-5 flex flex-col border border-gray-700">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-700 sticky top-0 z-10 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Subscription</h1>
          </div>
        </div>

        {/* PremiumSignUp Content */}
        <div className="mt-6">
          <div className="text-center mb-10">
            <FaXTwitter className="text-blue-500 text-6xl mx-auto mb-4" />
            <h1 className="text-4xl font-bold">Subscribe to Premium</h1>
            <p className="text-gray-500 mt-2">
              Unlock exclusive features and support the platform you love.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {/* Basic Plan */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Basic</h2>
              <p className="text-gray-400 mb-6">
                Get access to essential features.
              </p>
              <p className="text-4xl font-bold mb-6">
                $5<span className="text-gray-400 text-lg">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Ad-free experience",
                  "Custom themes",
                  "Priority support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-blue-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Pro</h2>
              <p className="text-gray-400 mb-6">
                Unlock advanced features and tools.
              </p>
              <p className="text-4xl font-bold mb-6">
                $10<span className="text-gray-400 text-lg">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "All Basic features",
                  "Analytics dashboard",
                  "Exclusive content",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-blue-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Premium</h2>
              <p className="text-gray-400 mb-6">
                Get everything, plus exclusive perks.
              </p>
              <p className="text-4xl font-bold mb-6">
                $15<span className="text-gray-400 text-lg">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "All Pro features",
                  "Early access to new features",
                  "Dedicated account manager",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-blue-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-gray-500">
            <p>
              Questions?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Contact support
              </a>
            </p>
            <p className="mt-2">© 2023 Twitter, Inc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}