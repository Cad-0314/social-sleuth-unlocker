
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { ArrowRight, Copy, Check, Info, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    "j4zz h4nd m00n"
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Verification Step</CardTitle>
          <p className="text-sm text-muted-foreground">Send a message to complete verification</p>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-4">
          <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg border border-secondary/40">
            <Avatar className="h-12 w-12 border border-primary/30">
              <AvatarImage src={profileData?.profile_pic_url} />
              <AvatarFallback className="bg-secondary text-primary font-bold">
                {username?.substring(0, 2)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-foreground">@{username}</div>
              <p className="text-sm text-muted-foreground">
                {profileData?.followers?.toLocaleString() || "—"} followers
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-secondary/20 p-4 rounded-lg border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Info className="h-4 w-4" />
                <h3 className="font-medium">Instructions</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                To verify your account, please send the exact message below to <span className="text-primary font-semibold">@{username}</span> from your Instagram account.
              </p>
            </div>
            
            <div className="border border-primary/30 rounded-lg overflow-hidden">
              <div className="bg-secondary/30 px-4 py-2 border-b border-primary/20 flex justify-between items-center">
                <span className="text-xs font-medium text-primary/80">VERIFICATION CODE</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopyMessage}
                  className="h-7 text-xs"
                >
                  {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="p-4 bg-secondary/10 font-mono text-center">
                <p className="text-primary font-bold tracking-wider select-all">{randomMessage}</p>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
              <p>This code helps us verify that you own the account</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                Your Instagram Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={senderUsername}
                  onChange={(e) => setSenderUsername(e.target.value)}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the username you used to send the message
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gap-2 py-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  I've Sent The Message
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground pt-2">
              After sending the message, click the button above to continue
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagePage;
