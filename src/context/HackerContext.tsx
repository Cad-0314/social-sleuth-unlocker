
import React, { createContext, useContext, useState } from "react";

interface ProfileData {
  username: string;
  full_name: string;
  bio?: string;
  biography?: string;
  is_verified: boolean;
  is_business_account?: boolean;
  followers?: number;
  follower_count?: number;
  following?: number;
  following_count?: number;
  post_count?: number;
  profile_pic_url?: string;
  profile_picture?: string;
  is_private: boolean;
  external_url?: string;
}

interface HackerContextType {
  username: string;
  setUsername: (username: string) => void;
  senderUsername: string;
  setSenderUsername: (username: string) => void;
  profilePic: string;
  setProfilePic: (pic: string) => void;
  verificationStatus: boolean;
  setVerificationStatus: (status: boolean) => void;
  paymentComplete: boolean;
  setPaymentComplete: (status: boolean) => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
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
  const [senderUsername, setSenderUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value = {
    username,
    setUsername,
    senderUsername,
    setSenderUsername,
    profilePic,
    setProfilePic,
    verificationStatus,
    setVerificationStatus,
    paymentComplete,
    setPaymentComplete,
    profileData,
    setProfileData,
    isLoading,
    setIsLoading,
    error,
    setError
  };

  return <HackerContext.Provider value={value}>{children}</HackerContext.Provider>;
}
