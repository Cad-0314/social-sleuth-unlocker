
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Check } from "lucide-react";

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
  
  const password = getUserPassword();

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center my-4">
              <div className="rounded-full bg-primary/20 p-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-center text-primary">
              Password Successfully Recovered
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Credentials for @{username} have been retrieved
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <img 
              src={profileData?.profile_pic_url} 
              alt={username} 
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
            <div className="ml-4">
              <p className="text-primary font-bold">@{username}</p>
              <p className="text-xs text-muted-foreground">Instagram Account</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Username:</p>
              <div className="bg-secondary/30 p-3 rounded font-mono text-primary">
                {username}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Password:</p>
              <div onClick={handleCopyPassword} className="bg-secondary/30 p-3 rounded font-mono text-primary cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center">
                <span>{password}</span>
                <span className="text-muted-foreground text-xs">Click to copy</span>
              </div>
            </div>
            
            <div className="bg-secondary/10 border border-secondary/30 p-3 rounded mt-4">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-bold">IMPORTANT:</span> This 
                password was generated for demonstration purposes only. No actual 
                Instagram accounts were accessed. Using this tool to attempt to access 
                someone's account without permission is illegal.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleStartOver}
            className="w-full mt-6 bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            Hack Another Account
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real Instagram accounts were compromised. The displayed password is fake.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
