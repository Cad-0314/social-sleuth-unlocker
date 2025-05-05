
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
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg relative z-0">
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="h-6 w-6 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold neon-text">Send Verification</h1>
            <Zap className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm backdrop-blur-sm px-4 py-2 rounded-full inline-block">Final step - send message to complete access</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg border-2 border-primary/30 shadow-[0_0_30px_rgba(140,80,255,0.25)] rounded-xl overflow-hidden animate-pulse-glow">
          <div className="terminal-header p-3 bg-secondary/30">
            <div className="flex items-center space-x-2">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
              <div className="ml-2 text-xs text-primary/90 font-bold tracking-wide">secure-connection.sh</div>
            </div>
          </div>
          
          <div className="p-5 md:p-6 space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg border border-secondary/40 shadow-inner hover:border-primary/30 transition-colors backdrop-blur-sm">
              <Avatar className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} border-2 border-primary/50 shadow-[0_0_15px_rgba(140,80,255,0.4)] animate-float`}>
                <AvatarImage src={profileData?.profile_pic_url} />
                <AvatarFallback className="bg-secondary text-primary font-bold">
                  {username?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground text-lg">@{username}</span>
                  {profileData?.is_verified && (
                    <span className="bg-primary/30 p-1 rounded-full">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {profileData?.followers?.toLocaleString() || "—"} followers
                </p>
              </div>
            </div>
            
            <div className="mb-5">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2 neon-text">
                <Lock className="h-5 w-5" />
                <span className="type-animation">Final Verification Step</span>
              </h2>
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground bg-secondary/20 p-4 rounded-lg border border-secondary/30 shadow-inner">
                  To complete access, send exactly this message to <span className="text-primary font-semibold">@{username}</span> from your account:
                </div>
                
                <div 
                  onClick={handleCopyMessage}
                  className="p-4 bg-secondary/30 border border-primary/20 rounded-lg cursor-pointer hover:bg-secondary/40 transition-all font-mono text-sm shadow-inner relative overflow-hidden group neon-box"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary/80 font-bold tracking-widest">SECRET CODE:</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyMessage();
                      }}
                      className="h-8 px-3 bg-secondary/50 hover:bg-secondary/70 text-primary border border-primary/30 rounded-full hover-glow"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                      <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
                    </Button>
                  </div>
                  <p className="text-primary font-bold tracking-widest py-3 text-center text-lg neon-text">{randomMessage}</p>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2 animate-pulse"></div>
                  <p>Send exactly as shown to verify account ownership</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 border-t border-primary/20 pt-5">
              <div className="space-y-2">
                <label className="text-sm text-primary/90 flex items-center gap-2 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block"></span>
                  Your Instagram Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/80 font-bold">@</span>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={senderUsername}
                    onChange={(e) => setSenderUsername(e.target.value)}
                    className="bg-secondary/30 border-secondary hover:border-primary focus:border-primary focus:ring-primary/30 pl-8 transition-all rounded-lg"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the username you used to send the message
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-5 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(140,80,255,0.4)] transition-all py-6 rounded-xl hover:translate-y-[-2px]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    I've Sent The Message
                    <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="bg-secondary/20 py-4 px-4 text-center border-t border-primary/20">
            <p className="text-xs text-primary/80 font-mono tracking-wider">
              <span className="animate-pulse inline-block mr-1.5">▌</span> Connection secured | Waiting for message verification
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-5 backdrop-blur-sm py-2 px-4 rounded-full inline-block">
          <p className="opacity-70">For educational purposes only. This is a simulation.</p>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
