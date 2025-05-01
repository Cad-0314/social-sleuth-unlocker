
import React, { createContext, useContext, useState } from "react";

interface HackerContextType {
  username: string;
  setUsername: (username: string) => void;
  profilePic: string;
  setProfilePic: (pic: string) => void;
  verificationStatus: boolean;
  setVerificationStatus: (status: boolean) => void;
  paymentComplete: boolean;
  setPaymentComplete: (status: boolean) => void;
}

const HackerContext = createContext<HackerContextType | undefined>(undefined);

export function useHackerContext() {
  const context = useContext(HackerContext);
  if (!context) {
    throw new Error("useHackerContext must be used within a HackerProvider");
  }
  return context;
}

export function HackerProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const value = {
    username,
    setUsername,
    profilePic,
    setProfilePic,
    verificationStatus,
    setVerificationStatus,
    paymentComplete,
    setPaymentComplete
  };

  return <HackerContext.Provider value={value}>{children}</HackerContext.Provider>;
}
