
import { RefreshCw } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg text-center">
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(255,73,160,0.2)] scanner-effect">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" style={{animationDuration: "0.8s"}}></div>
              <div className="absolute inset-3 border-3 border-primary/20 border-b-primary rounded-full animate-spin animation-delay-150" style={{animationDuration: "0.6s"}}></div>
              <div className="absolute inset-6 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-primary font-mono text-base sm:text-lg mb-2">Connecting to Target</h3>
            <div className="flex flex-col space-y-1 mt-2 terminal-text">
              <p className="text-xs sm:text-sm text-primary/80">
                <span className="text-primary/60">[system]$</span> Establishing connection...
              </p>
              <p className="text-xs sm:text-sm text-primary/80">
                <span className="text-primary/60">[system]$</span> Retrieving account data...
              </p>
              <p className="text-xs sm:text-sm text-primary/80 animate-pulse">
                <span className="text-primary/60">[system]$</span> _
              </p>
            </div>
            
            <div className="mt-6">
              <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ 
                  width: '80%', 
                  boxShadow: '0 0 10px rgba(255,73,160,0.7)',
                  animationDuration: "1s" 
                }}></div>
              </div>
              <p className="text-xs text-primary/70 mt-2">Securing connection...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
