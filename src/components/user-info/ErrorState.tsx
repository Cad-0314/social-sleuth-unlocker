
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Youtube } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onTutorial: () => void;
}

const ErrorState = ({ error, onRetry, onTutorial }: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-destructive/30 shadow-[0_0_25px_rgba(255,50,50,0.3)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="p-4 sm:p-6">
            <Alert variant="destructive" className="mb-4 bg-destructive/20 border-destructive/30">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              <AlertTitle className="text-destructive text-sm sm:text-base">Account Not Found</AlertTitle>
              <AlertDescription className="text-destructive/90 text-xs sm:text-sm break-words">
                {error}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-2 mt-4 terminal-text">
              <p className="text-xs sm:text-sm text-destructive/80">
                <span className="text-destructive/60">[system]$</span> Error: Username not found
              </p>
              <p className="text-xs sm:text-sm text-destructive/80">
                <span className="text-destructive/60">[system]$</span> Please check the username and try again
              </p>
              <p className="text-xs sm:text-sm text-destructive/80 animate-pulse">
                <span className="text-destructive/60">[system]$</span> _
              </p>
            </div>
            
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                onClick={onRetry}
                variant="cyber"
                className="w-full text-destructive-foreground bg-destructive hover:bg-destructive/80 shadow-[0_0_15px_rgba(255,70,70,0.3)] text-sm sm:text-base"
              >
                Try Different Username
              </Button>
              
              <Button
                onClick={onTutorial}
                variant="secondary"
                className="w-full bg-[#151f32] hover:bg-[#1a2236] text-white border border-[#3CEFFF]/20"
              >
                <Youtube className="h-4 w-4 mr-2" />
                Watch Tutorial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
