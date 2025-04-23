"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { createContext, useEffect, useState } from "react";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export const AppContext = createContext();

export function Providers({ children }) {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    let delays = [5000, 30000, 60000];
    let index = 0;
    let timer;
  
    const checkAuth = () => {
      const jwt = localStorage.getItem("jwt");
      
      // 🔹 Prevent showing SignIn if SignUp is open
      if (!jwt && !showSignUp) {
        setShowSignIn(true);
      }
  
      timer = setTimeout(checkAuth, delays[index]);
      index = (index + 1) % delays.length;
    };
  
    checkAuth();
  
    return () => clearTimeout(timer);
  }, [showSignUp]); // 🔹 Add `showSignUp` as a dependency
  

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setShowSignIn(false);
      setShowSignUp(false);
    }
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ setShowSignIn, showSignUp }}>
  {children}
  {showSignIn && (
    <SignInForm
      handleClose={handleClose}
      setShowSignUp={setShowSignUp}
      setShowSignIn={setShowSignIn}
    />
  )}
  {showSignUp && (
    <SignUpForm
      handleClose={handleClose}
      setShowSignIn={setShowSignIn}
      setShowSignUp={setShowSignUp}
    />
  )}
</AppContext.Provider>

    </Provider>
  );
}
