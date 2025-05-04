
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

// Function to decode base64 strings
const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch (e) {
    console.error("Failed to decode security token");
    return "";
  }
};

// Decode security strings on demand, not storing them in plaintext
const getDecodedSecurityStrings = (): string[] => {
  return encodedSecurityStrings.map(str => decodeBase64(str));
};

const UserInfoPage = () => {
  const { username, profileData, error, isLoading, setError } = useHackerContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && !isLoading) {
      navigate("/");
    }
  }, [navigate, username, isLoading]);

  // Get a security token based on username, with improved security
  const getSecurityToken = (): string => {
    if (!username) return getDecodedSecurityStrings()[0];
    
    // Use a more complex algorithm to determine which token to use
    const hashCode = Array.from(username).reduce(
      (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
    );
    const index = Math.abs(hashCode % getDecodedSecurityStrings().length);
    return getDecodedSecurityStrings()[index];
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
