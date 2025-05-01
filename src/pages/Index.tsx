
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const Index = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUsername, setProfilePic } = useHackerContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUsername) {
      toast.error("Please enter an Instagram username");
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would call an API to fetch info
    // Here we're just simulating a delay
    setTimeout(() => {
      // Store in context
      setUsername(inputUsername);
      
      // Generate a fake profile pic URL (in reality this would come from an API)
      const randomId = Math.floor(Math.random() * 1000);
      setProfilePic(`https://i.pravatar.cc/150?img=${randomId}`);
      
      setLoading(false);
      navigate("/verify");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-secondary p-3 shadow-[0_0_15px_rgba(0,255,170,0.5)]">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 
            className="text-3xl font-bold glitch" 
            data-text="Instagram Password Finder"
          >
            Instagram Password Finder
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter an Instagram username to retrieve their password
          </p>
        </div>
        
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          <div className="text-primary text-xs mb-4">
            <span className="text-muted-foreground">[root@secured-server]$ </span>
            <span className="type-animation">
              initializing password recovery tool v3.4...
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Instagram username (without @)"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="bg-background border-secondary text-foreground focus:border-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
              disabled={loading}
            >
              {loading ? "Processing..." : "Find Password"}
            </Button>
          </form>
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
