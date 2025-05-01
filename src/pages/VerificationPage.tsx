
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VerificationPage = () => {
  const { username, profileData, setVerificationStatus } = useHackerContext();
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState("");
  const [senderAccount, setSenderAccount] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!senderAccount || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // In a real app, this would verify the information
    // Here we're just simulating success
    setMessageSent(true);
    setVerificationStatus(true);
    toast.success("Account verified successfully!");
    
    setTimeout(() => {
      navigate("/payment");
    }, 2000);
  };

  if (!username || !profileData) {
    navigate("/");
    return null;
  }

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
            <span className="type-animation">account verification</span>
          </h2>
          
          <Card className="mb-6 bg-background/50 border-secondary">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={profileData.profile_pic_url} 
                  alt={username} 
                  className="w-16 h-16 rounded-full border-2 border-primary"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
                  }}
                />
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-bold">@{profileData.username}</p>
                    {profileData.is_verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-primary-foreground">{profileData.full_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {profileData.is_private ? "Private Account" : "Public Account"}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-3">
                <p className="mb-1">{profileData.bio}</p>
                <p className="mb-1">
                  <span className="font-bold">{formatNumber(profileData.followers)}</span> followers · 
                  <span className="font-bold ml-1">{formatNumber(profileData.following)}</span> following
                </p>
                <p className="mb-1">
                  {profileData.is_business_account ? "Business Account" : "Personal Account"}
                </p>
              </div>
              
              <div className="text-xs bg-secondary/30 p-2 rounded-md">
                <p className="text-primary-foreground">
                  Account found in database. Profile data successfully retrieved.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4 border border-secondary p-4 rounded-md mb-6">
            <p className="text-sm text-muted-foreground">
              To verify server address and connect to Instagram's authentication servers, 
              please send the following message from any Instagram account to @{username}:
            </p>
            
            <div className="bg-secondary/50 p-2 rounded text-primary text-sm font-mono">
              #verify-server-IXST8{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </div>
            
            <p className="text-xs text-muted-foreground">
              This message helps our system triangulate the server location of the target account.
            </p>

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Instagram account used to send message"
                value={senderAccount}
                onChange={(e) => setSenderAccount(e.target.value)}
                className="bg-background border-secondary"
                disabled={messageSent}
              />
              
              <Textarea
                placeholder="Copy and paste the exact verification code you sent"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background border-secondary h-20"
                disabled={messageSent}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleVerify} 
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2"
            disabled={messageSent}
          >
            <MessageSquare className="h-4 w-4" />
            {messageSent ? "Verified ✓" : "Verify Message Sent"}
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
