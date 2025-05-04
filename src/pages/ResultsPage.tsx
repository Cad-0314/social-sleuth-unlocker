
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Check } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import ProfileDisplay from "@/components/results/ProfileDisplay";
import CredentialsSection from "@/components/results/CredentialsSection";
import SecurityNotice from "@/components/results/SecurityNotice";

// Demo predefined passwords
const demoPasswords = [
  "Insta123!",
  "Password2024#",
  "SecretAccess55!",
  "MyAccount_92",
  "SocialMedia2025$",
  "PrivateLogin!23",
  "InstagramUser789!",
  "AccessGranted123$",
  "SecurePass2024!",
  "ProfileLogin&75"
];

// Security strings that look like access tokens
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

const ResultsPage = () => {
  const { username, profileData } = useHackerContext();
  const navigate = useNavigate();
  
  // Get a consistent password based on username
  const getUserPassword = () => {
    if (!username) return demoPasswords[0];
    
    // Use the first character of the username to select a password
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % demoPasswords.length;
    return demoPasswords[index];
  };
  
  // Get a security string
  const getSecurityString = () => {
    if (!username) return securityStrings[0];
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % securityStrings.length;
    return securityStrings[index];
  };
  
  const password = getUserPassword();
  const securityToken = getSecurityString();

  useEffect(() => {
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
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real Instagram accounts were compromised. The displayed information is fake.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
