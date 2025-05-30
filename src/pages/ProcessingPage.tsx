import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useHackerContext } from "@/context/HackerContext";

const ProcessingPage = () => {
  const { username } = useHackerContext();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Reduced number of steps for faster experience
  const steps = [
    "Initializing session...",
    "Connecting to Instagram servers...",
    "Locating target account: @" + username,
    "Scanning for vulnerabilities...",
    "Bypassing security protocols...",
    "Retrieving account credentials...",
    "Success! Password recovered."
  ];

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setProgress(oldProgress => {
        // Increase the speed significantly with larger increment
        const newProgress = Math.min(oldProgress + Math.random() * 20, 100);
        
        // Update current step based on progress
        const stepIndex = Math.min(
          Math.floor((newProgress / 100) * steps.length),
          steps.length - 1
        );
        setCurrentStep(stepIndex);
        
        if (newProgress === 100) {
          clearInterval(timer);
          // Reduced delay before navigating to results
          setTimeout(() => navigate("/results"), 300);
        }
        
        return newProgress;
      });
    }, 100); // Reduced interval from 150ms to 100ms

    return () => {
      clearInterval(timer);
    };
  }, [navigate, steps.length, username]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <h2 className="text-xl font-bold mb-6 text-primary">
            <span className="text-muted-foreground">[root@secured-server]$ </span>
            <span className="type-animation">execute crack.sh -target @{username}</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-secondary" />
            </div>
            
            <div className="h-64 overflow-y-auto bg-secondary/30 rounded-md p-3 font-mono text-xs space-y-2">
              {steps.slice(0, currentStep + 1).map((step, index) => (
                <div key={index} className="flex">
                  <span className="text-muted-foreground mr-2">[{String(index).padStart(2, '0')}]</span>
                  <span className={index === currentStep ? "text-primary" : "text-muted-foreground"}>
                    {step}
                    {index === currentStep && progress < 100 && (
                      <span className="animate-pulse">_</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>
                Estimated time remaining: {Math.ceil((100 - progress) / 50)} seconds
              </p>
              <p className="mt-2">
                Using advanced algorithms to decrypt target's credentials...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
