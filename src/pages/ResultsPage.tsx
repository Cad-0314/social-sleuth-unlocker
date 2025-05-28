import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Check } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import ProfileDisplay from "@/components/results/ProfileDisplay";
import CredentialsSection from "@/components/results/CredentialsSection";
import SecurityNotice from "@/components/results/SecurityNotice";
import { getCustomPassword } from "@/data/passwords";

// Demo predefined passwords - stored as an encoded array for better security
const encodedPasswords = [
  "SW5zdGExMjMh", // Insta123!
  "UGFzc3dvcmQyMDI0Iw==", // Password2024#
  "U2VjcmV0QWNjZXNzNTUh", // SecretAccess55!
  "TXlBY2NvdW50Xzky", // MyAccount_92
  "U29jaWFsTWVkaWEyMDI1JA==", // SocialMedia2025$
  "UHJpdmF0ZUxvZ2luITIz", // PrivateLogin!23
  "SW5zdGFncmFtVXNlcjc4OSE=", // InstagramUser789!
  "QWNjZXNzR3JhbnRlZDEyMyQ=", // AccessGranted123$
  "U2VjdXJlUGFzczIwMjQh", // SecurePass2024!
  "UHJvZmlsZUxvZ2luJjc1" // ProfileLogin&75
];

// Security strings that look like access tokens - encoded for security
const encodedSecurityStrings = [
  "SUdRVkpZZUVoeWVrUklhMEpaQVdFOWtPVkJNY0ZaQVJUMVJ1WDA1d1MyZ3lUVkI1UlZrd1ZrOXNWRFpBYmVVTmtkRmQwTFZkd2IwMXlSVTVKUmpWMWVUUkVNVFpBNVRrTkZlbmxYUWpaQXlV",
  "SUdRVkpXVkRsYU5rNWFZMGRyTUY5allqQkVTVlJrWWpFMlpGbDZTMEpSV2tocGVVVmFlR3R5YVhGa2NVTTFWV1Z4WkdwRlRYVnpRVTAzTlROVk4wZFZUV2g0UjNOaFJraHhXRWxPTg==",
  "SUdRVkpXVURSVk9YWkFrZG01dlpqSnhUR053TUVsRWJFeGpXbE5IUzJkME4yeHZhRlpBVVVsd01ORlJPYVhCSlVETnNaQXhad0YzZEdTMGxmUmtsTmNsSkxVVFJvTlZSbVNVSlRNRkpWYm1OU04==",
  "SUdRVkpZV0ZjME5teFpSMWxmT0RsTk5ISjNObDgxV0d4UVgzcDRVV3RITUZOTVlWVXlWbkpqWTJOMU5VRm5NWFZwWTFaQUVSMVJWWkFHUlZZM1ltSkNXRWhFWkFrUlJMVzVoTmpOek4=",
  "SUdRVkpYZDBNeFRsSXhiVlV5U2xOeFRreHRjWFZ3T1dzeFFYWkFwUTFRMGVUbGpaMWROS1hoMFozbE9iM05PUmw4MWMwVjNMVmRwYUc5VU5GTlJjMEp5UVZwWFFVOVliVzgzUVd4TU4="
];

// Function to decode base64 strings securely
const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch (e) {
    console.error("Failed to decode security string");
    return "";
  }
};

const ResultsPage = () => {
  const { username, profileData } = useHackerContext();
  const navigate = useNavigate();
  
  // Use your custom password from the file
  const password = getCustomPassword(username);
  
  // Get a security string with improved security
  const getSecurityString = () => {
    if (!username) return decodeBase64(encodedSecurityStrings[0]);
    
    // Use more complex algorithm to get security token
    const hashCode = Array.from(username).reduce(
      (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
    );
    const index = Math.abs(hashCode % encodedSecurityStrings.length);
    return decodeBase64(encodedSecurityStrings[index]);
  };
  
  const securityToken = getSecurityString();

  useEffect(() => {
    // Protect against unauthorized access
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center my-4">
            <div className="rounded-full bg-primary/20 p-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-center text-primary">
            Password Successfully Recovered
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Full account details for @{username} have been retrieved
          </p>
        </div>

        <ProfileDisplay username={username} profileData={profileData} />

        <div className="mt-4">
          <CardContent className="p-0">
            <CredentialsSection 
              username={username} 
              password={password} 
              securityToken={securityToken} 
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-4">
            <SecurityNotice />
            
            <Button 
              onClick={handleStartOver}
              className="w-full mt-2 bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(0,255,170,0.2)]"
            >
              Hack Another Account
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
