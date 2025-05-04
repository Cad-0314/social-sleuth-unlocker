
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Check, Copy, UserRound, Shield, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { username, profileData, profilePic } = useHackerContext();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
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
    
    // Reset image error state when profileData changes
    setImageError(false);
  }, [navigate, username, profileData?.profile_pic_url, profilePic]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(securityToken);
    toast.success("Security token copied to clipboard!");
  };

  const handleStartOver = () => {
    navigate("/");
  };

  // Use profilePic from context if available and profileData.profile_pic_url is not
  const displayProfilePic = profileData?.profile_pic_url || profilePic;

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

        <Card className="border-primary/30 bg-secondary/10 backdrop-blur-lg shadow-[0_0_25px_rgba(0,255,170,0.2)]">
          <CardHeader>
            <div className="flex items-center gap-4">
              {displayProfilePic && !imageError ? (
                <img 
                  src={displayProfilePic} 
                  alt={username}
                  onError={() => setImageError(true)}
                  className="w-20 h-20 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,170,0.3)] object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,170,0.3)] bg-secondary flex items-center justify-center text-primary text-2xl font-semibold">
                  {username?.substring(0, 2)?.toUpperCase()}
                </div>
              )}
              <div>
                <CardTitle className="text-primary flex items-center gap-2">
                  @{username} 
                  {profileData?.is_verified && (
                    <span className="bg-primary/20 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {profileData?.full_name || "Instagram User"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Followers</span>
              </div>
              <span className="font-semibold text-primary">{profileData?.followers?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Following</span>
              </div>
              <span className="font-semibold text-primary">{profileData?.following?.toLocaleString()}</span>
            </div>
            
            {profileData?.bio && (
              <div className="p-3 bg-secondary/20 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Bio</p>
                <p className="text-sm text-foreground">{profileData?.bio}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Account credentials
              </p>
              
              <div className="space-y-2 p-3 bg-secondary/20 rounded-md">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Username</p>
                  <div className="bg-secondary/30 p-2 rounded font-mono text-primary text-sm">
                    {username}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Password</p>
                  <div 
                    onClick={handleCopyPassword} 
                    className="bg-secondary/30 p-2 rounded font-mono text-primary text-sm cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
                  >
                    <span>{password}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Security Token</p>
                  <div 
                    onClick={handleCopyToken} 
                    className="bg-secondary/30 p-2 rounded font-mono text-primary/90 text-xs cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
                  >
                    <span className="truncate">{securityToken}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="bg-secondary/10 border border-secondary/30 p-3 rounded w-full">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-bold">IMPORTANT:</span> This 
                password was generated for demonstration purposes only. No actual 
                Instagram accounts were accessed. Using this tool to attempt to access 
                someone's account without permission is illegal.
              </p>
            </div>
            
            <Button 
              onClick={handleStartOver}
              className="w-full mt-2 bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(0,255,170,0.2)]"
            >
              Hack Another Account
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real Instagram accounts were compromised. The displayed information is fake.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
