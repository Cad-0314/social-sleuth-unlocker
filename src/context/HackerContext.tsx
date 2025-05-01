
import React, { createContext, useContext, useState } from "react";

interface ProfileData {
  username: string;
  full_name: string;
  bio: string;
  is_verified: boolean;
  is_business_account: boolean;
  followers: number;
  following: number;
  profile_pic_url: string;
  is_private: boolean;
}

interface HackerContextType {
  username: string;
  setUsername: (username: string) => void;
  profilePic: string;
  setProfilePic: (pic: string) => void;
  verificationStatus: boolean;
  setVerificationStatus: (status: boolean) => void;
  paymentComplete: boolean;
  setPaymentComplete: (status: boolean) => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
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
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const value = {
    username,
    setUsername,
    profilePic,
    setProfilePic,
    verificationStatus,
    setVerificationStatus,
    paymentComplete,
    setPaymentComplete,
    profileData,
    setProfileData
  };

  return <HackerContext.Provider value={value}>{children}</HackerContext.Provider>;
}
