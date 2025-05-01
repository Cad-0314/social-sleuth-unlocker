
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Add this import
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { ArrowRight, Copy, Check, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessagePage = () => {
  const { username, profileData } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const [senderUsername, setSenderUsername] = useState("");
  const [randomMessage, setRandomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  
  const messages = [
    "Hey I saw your profile, can we talk for a minute? I need to share something with you.",
    "Hi, I think we met at the last party. Is this your account?",
    "Hello, I'm trying to find someone and I think we have a mutual friend, can you help?",
    "Hey, I found something important that belongs to you. Please reply asap.",
    "I'm organizing an event and would like to invite you. Can we chat?",
    "Your recent post was amazing! I'd love to connect and talk about it.",
    "Hey, I think I know you from school. Is this the right account?",
    "Hello, I saw your profile through a mutual connection. Can we chat?",
    "Hi there, are you the same person I met at the conference last week?",
    "I think I have some information you might find interesting. Can we talk?"
  ];
  
  useEffect(() => {
    if (!username || !profileData) {
      navigate("/");
      return;
    }
    
    // Select a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[randomIndex]);
  }, [username, profileData, navigate, messages]);
  
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(randomMessage);
    setCopied(true);
    toast.success("Message copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderUsername) {
      toast.error("Please enter your username");
      return;
    }
    
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      navigate("/processing");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary">Send Verification Message</h1>
          <p className="text-muted-foreground text-sm">Almost there - send this message to complete the process</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="flex items-center space-x-3 my-4 p-3 bg-secondary/30 rounded-md border border-secondary/50">
            <Avatar className="h-12 w-12 border-2 border-primary/30 shadow-[0_0_10px_rgba(0,255,170,0.3)]">
              <AvatarImage src={profileData?.profile_pic_url} />
              <AvatarFallback className="bg-secondary text-primary">
                {username?.substring(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">@{username}</span>
                {profileData?.is_verified && (
                  <span className="bg-primary/20 p-0.5 rounded">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {profileData?.followers?.toLocaleString() || "—"} followers
              </p>
            </div>
          </div>
          
          <div className="mb-5">
            <h2 className="text-lg font-bold mb-2 text-primary flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="type-animation">Send Message to Complete</span>
            </h2>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-muted-foreground">
                To complete the password recovery, send exactly this message to @{username} from your account:
              </p>
              
              <div 
                onClick={handleCopyMessage}
                className="p-3 bg-secondary/20 border border-secondary/40 rounded-md cursor-pointer hover:bg-secondary/30 transition-colors font-mono text-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Message to send:</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyMessage();
                    }}
                    className="h-7 px-2"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <p className="text-primary">{randomMessage}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Your Instagram Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  type="text"
                  placeholder="Enter your Instagram username"
                  value={senderUsername}
                  onChange={(e) => setSenderUsername(e.target.value)}
                  className="bg-background/40 border-secondary focus:border-primary pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the username you'll use to send the message
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,170,0.3)]"
              disabled={loading}
            >
              {loading ? "Verifying..." : "I've Sent The Message"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real Instagram messages are sent or verified.</p>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
