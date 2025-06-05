
import { RefreshCw, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface LoadingStateProps {
  onTutorial: () => void;
}

const LoadingState = ({ onTutorial }: LoadingStateProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [typingText, setTypingText] = useState("");
  
  const searchSteps = [
    { message: "Connecting to Instagram servers...", duration: 1500 },
    { message: "Authenticating request...", duration: 1200 },
    { message: "Searching user database...", duration: 2000 },
    { message: "Retrieving profile information...", duration: 1800 },
    { message: "Validating account data...", duration: 1000 },
    { message: "Processing results...", duration: 800 }
  ];

  // Typing effect for messages
  useEffect(() => {
    if (currentMessage) {
      setTypingText("");
      let index = 0;
      const timer = setInterval(() => {
        if (index < currentMessage.length) {
          setTypingText(currentMessage.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [currentMessage]);

  // Progress through search steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep < searchSteps.length) {
          setCurrentMessage(searchSteps[nextStep].message);
          return nextStep;
        }
        return prev;
      });
      
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 95);
        return newProgress;
      });
    }, 1500);

    // Set initial message
    setCurrentMessage(searchSteps[0].message);
    
    return () => clearInterval(timer);
  }, []);

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
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full animate-spin" style={{animationDuration: "1.2s"}}></div>
              <div className="absolute inset-2 border-3 border-primary/20 border-r-primary rounded-full animate-spin" style={{animationDuration: "0.8s", animationDirection: "reverse"}}></div>
              <div className="absolute inset-4 border-2 border-primary/40 border-b-primary rounded-full animate-spin" style={{animationDuration: "1.5s"}}></div>
              <div className="absolute inset-7 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-primary font-mono text-base sm:text-lg mb-4">Searching User on Server</h3>
            
            <div className="bg-black/30 rounded-lg p-3 mb-4 border border-primary/20">
              <div className="flex flex-col space-y-2 terminal-text h-20 overflow-hidden">
                <p className="text-xs sm:text-sm text-primary/80">
                  <span className="text-primary/60">[server]$</span> {typingText}
                  <span className="animate-pulse">|</span>
                </p>
                {searchSteps.slice(0, currentStep).map((step, index) => (
                  <p key={index} className="text-xs sm:text-sm text-primary/60 transition-opacity duration-300">
                    <span className="text-primary/40">[completed]</span> {step.message}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs text-primary/70 mb-2">
                <span>Search Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500 ease-out" 
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 15px rgba(255,73,160,0.6)'
                  }}
                />
              </div>
            </div>
            
            <Button
              onClick={onTutorial}
              variant="secondary"
              size="sm"
              className="bg-[#151f32] hover:bg-[#1a2236] text-white border border-[#3CEFFF]/20"
            >
              <Youtube className="h-4 w-4 mr-2" />
              Watch Tutorial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
