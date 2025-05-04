
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { ArrowRight, Copy, Check, Lock, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const MessagePage = () => {
  const { username, profileData } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const [senderUsername, setSenderUsername] = useState("");
  const [randomMessage, setRandomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const nonsenseMessages = [
    "k3yVlt nw wkdmx plz",
    "frzn br0k3 nfly",
    "bzzp klonk verify",
    "skrrt vroom access",
    "j4zz h4nd m00n",
    "b33p gr00v3 fl1p",
    "wh00p sk4d00sh",
    "zxcvqrtl pinging",
    "flrp dr0p hask",
    "klik blok zing"
  ];
  
  useEffect(() => {
    if (!username || !profileData) {
      navigate("/");
      return;
    }
    
    // Select a random message
    const randomIndex = Math.floor(Math.random() * nonsenseMessages.length);
    setRandomMessage(nonsenseMessages[randomIndex]);
  }, [username, profileData, navigate, nonsenseMessages]);
  
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-primary">Send Verification</h1>
            <Zap className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">Final step - send message to complete access</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg border border-primary/30 shadow-[0_0_30px_rgba(0,255,170,0.25)] rounded-lg overflow-hidden">
          <div className="terminal-header p-2 bg-secondary/20">
            <div className="flex items-center space-x-2">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
              <div className="ml-2 text-xs text-primary/70">secure-connection.sh</div>
            </div>
          </div>
          
          <div className="p-4 md:p-6 space-y-5">
            <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-md border border-secondary/40 shadow-inner">
              <Avatar className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} border-2 border-primary/30 shadow-[0_0_10px_rgba(0,255,170,0.3)]`}>
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
              <h2 className="text-lg font-bold mb-3 text-primary flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="type-animation">Final Verification Step</span>
              </h2>
              
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground bg-secondary/10 p-3 rounded-md border border-secondary/20">
                  To complete access, send exactly this message to <span className="text-primary font-semibold">@{username}</span> from your account:
                </div>
                
                <div 
                  onClick={handleCopyMessage}
                  className="p-4 bg-secondary/20 border border-secondary/30 rounded-md cursor-pointer hover:bg-secondary/30 transition-colors font-mono text-sm shadow-inner relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary/70 font-semibold">SECRET CODE:</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyMessage();
                      }}
                      className="h-7 px-2 bg-secondary/30 hover:bg-secondary/50 text-primary"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                      <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
                    </Button>
                  </div>
                  <p className="text-primary font-bold tracking-wide py-2">{randomMessage}</p>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <div className="h-1 w-1 rounded-full bg-primary/50 mr-2"></div>
                  <p>Send exactly as shown to verify account ownership</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-primary/10 pt-4">
              <div className="space-y-2">
                <label className="text-sm text-primary/80 flex items-center gap-1.5 font-medium">
                  <span className="h-1 w-1 rounded-full bg-primary inline-block"></span>
                  Your Instagram Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60">@</span>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={senderUsername}
                    onChange={(e) => setSenderUsername(e.target.value)}
                    className="bg-secondary/10 border-secondary hover:border-primary focus:border-primary pl-8 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the username you used to send the message
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,170,0.3)] transition-all py-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    I've Sent The Message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="bg-secondary/10 py-3 px-4 text-center border-t border-primary/10">
            <p className="text-xs text-primary/60 font-mono">
              <span className="animate-pulse">▌</span> Connection secured | Waiting for message verification
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p className="opacity-60">For educational purposes only. This is a simulation.</p>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
