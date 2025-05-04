
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import ErrorState from "@/components/user-info/ErrorState";
import LoadingState from "@/components/user-info/LoadingState";
import MainContent from "@/components/user-info/MainContent";

// Demo predefined security strings
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

const UserInfoPage = () => {
  const { username, profileData, error, isLoading, setError } = useHackerContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && !isLoading) {
      navigate("/");
    }
  }, [navigate, username, isLoading]);

  // Get a security token based on username
  const getSecurityToken = () => {
    if (!username) return securityStrings[0];
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % securityStrings.length;
    return securityStrings[index];
  };

  const securityToken = getSecurityToken();

  const handleContinueToPayment = () => {
    navigate("/payment");
  };

  const handleRetry = () => {
    navigate("/");
  };

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }
  
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <MainContent 
      username={username} 
      profileData={profileData} 
      securityToken={securityToken}
      onContinueToPayment={handleContinueToPayment}
    />
  );
};

export default UserInfoPage;
