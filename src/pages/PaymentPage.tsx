
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { Shield } from "lucide-react";
import { toast } from "sonner";

import ProfileSection from "@/components/payment/ProfileSection";
import SecurityToken from "@/components/payment/SecurityToken";
import PaymentHeader from "@/components/payment/PaymentHeader";
import UpiPayment from "@/components/payment/UpiPayment";
import PaymentForm, { PaymentFormData } from "@/components/payment/PaymentForm";

// Demo predefined security strings - same as in ResultsPage
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

// Random messages to choose from
const messages = [
  "Hey I saw your profile, can we talk for a minute? I need to share something with you.",
  "Hi, I think we met at the last party. Is this your account?",
  "Hello, I'm trying to find someone and I think we have a mutual friend, can you help?",
  "Hey, I found something important that belongs to you. Please reply asap.",
  "I'm organizing an event and would like to invite you. Can we chat?",
  "Your recent post was amazing! I'd love to connect and talk about it.",
  "Hey, I think I know you from school. Is this the right account?",
  "Hello, I saw your profile through a mutual connection. Can we chat?",
  "Hi there, are you the same person I met at the conference last week?",
  "I think I have some information you might find interesting. Can we talk?"
];

// UPI Payment details
const UPI_ID = "yourupiid@upi";
const QR_CODE_URL = "https://placehold.co/300x300?text=UPI+QR+CODE";

const PaymentPage = () => {
  const { username, profileData, setPaymentComplete } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      // Validate username format
      if (username.includes(" ")) {
        setUsernameError("Username cannot contain spaces");
      } else if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters long");
      } else {
        setUsernameError("");
      }
      
      // Select a random message
      const randomIndex = Math.floor(Math.random() * messages.length);
      setRandomMessage(messages[randomIndex]);
    }
  }, [navigate, username]);

  // Get a security token based on username
  const getSecurityToken = () => {
    if (!username) return securityStrings[0];
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % securityStrings.length;
    return securityStrings[index];
  };

  const securityToken = getSecurityToken();

  const handlePaymentSubmit = (formData: PaymentFormData) => {
    // Validation for required fields
    if (!formData.transactionId) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would process payment
    // Here we're just simulating a delay
    setTimeout(() => {
      setPaymentComplete(true);
      navigate("/message");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary">Password Recovery</h1>
          <p className="text-muted-foreground text-sm">Complete payment to continue</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          {/* Profile Section Component */}
          <ProfileSection 
            username={username} 
            profileData={profileData} 
            usernameError={usernameError} 
          />

          {/* Security Token Component */}
          <SecurityToken securityToken={securityToken} />
          
          {/* Payment Header Component */}
          <PaymentHeader username={username} usernameError={usernameError} />
          
          {/* UPI Payment Component */}
          <UpiPayment upiId={UPI_ID} qrCodeUrl={QR_CODE_URL} />
          
          {/* Payment Form Component */}
          <PaymentForm 
            onSubmit={handlePaymentSubmit}
            loading={loading}
            usernameError={usernameError}
          />
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              256-bit SSL secured payment
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real payments are processed and no credentials are retrieved.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
