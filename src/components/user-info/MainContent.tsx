
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";
import ProfileSection from "@/components/payment/ProfileSection";
import SecurityToken from "@/components/payment/SecurityToken";

interface MainContentProps {
  username: string;
  profileData: any;
  securityToken: string;
  onContinueToPayment: () => void;
}

const MainContent = ({ username, profileData, securityToken, onContinueToPayment }: MainContentProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-1 w-6 sm:w-12 bg-primary/80 rounded-full"></div>
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Target Acquired</h1>
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
            <div className="h-1 w-6 sm:w-12 bg-primary/80 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">Account verification required to proceed</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/30 shadow-[0_0_30px_rgba(255,73,160,0.25)] scanner-effect">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-5 gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                <h2 className="text-base sm:text-lg font-bold text-primary">Target Information</h2>
              </div>
              <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30 whitespace-nowrap">
                Status: Connected
              </div>
            </div>
            
            <div className="mb-6">
              <ProfileSection 
                username={username} 
                profileData={profileData} 
              />

              <SecurityToken securityToken={securityToken} />
            </div>
            
            <Button 
              onClick={onContinueToPayment}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground cyber-button shadow-[0_0_15px_rgba(255,73,160,0.3)] font-medium text-sm sm:text-base py-4 sm:py-6"
            >
              Continue to Payment Authorization
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 my-4 border-t border-primary/20 pt-4 px-2 sm:px-4">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary/80 flex-shrink-0" />
            <p className="text-xs text-primary/80 text-center">
              Secure connection established | Encrypted session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
