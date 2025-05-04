
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
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
              onClick={onRetry}
              className="w-full mt-6 bg-destructive hover:bg-destructive/80 text-destructive-foreground shadow-[0_0_15px_rgba(255,70,70,0.3)]"
            >
              Retry with Different Username
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
