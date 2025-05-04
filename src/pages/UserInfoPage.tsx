
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { Button } from "@/components/ui/button";
import { Shield, Zap, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import ProfileSection from "@/components/payment/ProfileSection";
import SecurityToken from "@/components/payment/SecurityToken";

// Demo predefined security strings - same as in ResultsPage
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

const UserInfoPage = () => {
  const { username, profileData, error, isLoading } = useHackerContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
        <div className="w-full max-w-md md:max-w-lg">
          <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-destructive/30 shadow-[0_0_25px_rgba(255,50,50,0.3)]">
            <div className="terminal-header">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
            </div>
            
            <div className="p-6">
              <Alert variant="destructive" className="mb-4 bg-destructive/20 border-destructive/30">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="text-destructive">Account Error</AlertTitle>
                <AlertDescription className="text-destructive/90">
                  {error}
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col space-y-2 mt-4 terminal-text">
                <p className="text-sm text-destructive/80">
                  <span className="text-destructive/60">[system]$</span> Error code: ACCT_NOT_FOUND
                </p>
                <p className="text-sm text-destructive/80">
                  <span className="text-destructive/60">[system]$</span> Unable to establish connection with target account
                </p>
                <p className="text-sm text-destructive/80 animate-pulse">
                  <span className="text-destructive/60">[system]$</span> _
                </p>
              </div>
              
              <Button 
                onClick={handleRetry}
                className="w-full mt-6 bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow-[0_0_15px_rgba(255,70,70,0.3)]"
              >
                Retry with Different Username
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
        <div className="w-full max-w-md md:max-w-lg text-center">
          <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)]">
            <div className="terminal-header">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
            </div>
            
            <div className="p-6">
              <div className="loading-spinner mb-4"></div>
              <h3 className="text-primary font-mono text-lg mb-2">Connecting to Target</h3>
              <div className="flex flex-col space-y-2 mt-4 terminal-text">
                <p className="text-sm text-primary/80">
                  <span className="text-primary/60">[system]$</span> Establishing connection...
                </p>
                <p className="text-sm text-primary/80">
                  <span className="text-primary/60">[system]$</span> Retrieving account data...
                </p>
                <p className="text-sm text-primary/80 animate-pulse">
                  <span className="text-primary/60">[system]$</span> _
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-primary">Account Verification</h1>
            <Zap className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">Verify account details before proceeding to payment</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          {/* User Information Section */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
              <h2 className="text-lg font-bold text-primary">Target Account</h2>
            </div>
            
            {/* Profile Section - User Information */}
            <div className="mb-6">
              <ProfileSection 
                username={username} 
                profileData={profileData} 
              />

              <SecurityToken securityToken={securityToken} />
            </div>
            
            <Button 
              onClick={handleContinueToPayment}
              className="w-full mt-6 bg-primary hover:bg-primary/80 text-primary-foreground cyber-button shadow-[0_0_15px_rgba(0,255,170,0.3)]"
            >
              Continue to Payment
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mt-6 border-t border-primary/20 pt-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              256-bit SSL secured connection
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

export default UserInfoPage;
