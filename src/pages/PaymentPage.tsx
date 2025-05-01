
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Shield, Check, Lock, Users, UserRound, Copy, Link } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Demo predefined security strings - same as in ResultsPage
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

const PaymentPage = () => {
  const { username, profileData, setPaymentComplete } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

  // Get a security token based on username
  const getSecurityToken = () => {
    if (!username) return securityStrings[0];
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % securityStrings.length;
    return securityStrings[index];
  };

  const securityToken = getSecurityToken();

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvc) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would process payment
    // Here we're just simulating a delay
    setTimeout(() => {
      setPaymentComplete(true);
      navigate("/message");
    }, 2000);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(securityToken);
    toast.success("Security token copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary">Password Recovery</h1>
          <p className="text-muted-foreground text-sm">Complete payment to continue</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          {/* Enhanced Profile Section */}
          <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 mb-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)]">
                <AvatarImage src={profileData?.profile_pic_url} alt={username} className="object-cover" />
                <AvatarFallback className="bg-secondary text-primary text-lg">
                  {username?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">@{username}</h3>
                  {profileData?.is_verified && (
                    <span className="bg-primary/20 p-0.5 rounded">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                  )}
                </div>
                
                {profileData?.full_name && (
                  <p className="text-sm text-muted-foreground">{profileData.full_name}</p>
                )}
                
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary/80" />
                    <span className="text-xs text-muted-foreground">Followers:</span>
                    <span className="text-xs font-medium text-primary">{profileData?.followers?.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <UserRound className="h-4 w-4 text-primary/80" />
                    <span className="text-xs text-muted-foreground">Following:</span>
                    <span className="text-xs font-medium text-primary">{profileData?.following?.toLocaleString()}</span>
                  </div>
                </div>
                
                {profileData?.bio && (
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {profileData.bio}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  Security Token
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 p-0 hover:bg-transparent hover:text-primary"
                        onClick={handleCopyToken}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy security token</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-secondary/30 p-2 rounded text-xs font-mono text-primary/90 truncate">
                {securityToken}
              </div>
            </div>
          </div>
          
          <div className="mb-5">
            <h2 className="text-lg font-bold mb-2 text-primary flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="type-animation">Payment Required</span>
            </h2>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-muted-foreground">
                Complete payment to begin password recovery for @{username}
              </p>
              
              <div className="flex items-center gap-2 text-xs bg-green-900/20 text-green-400 p-2 rounded border border-green-900/30">
                <Shield className="h-4 w-4" />
                <span>Secure, encrypted payment process</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                <span className="text-xs text-primary">Required</span>
              </div>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleChange}
                className="bg-background/40 border-secondary focus:border-primary"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="cardName" className="text-sm">Cardholder Name</Label>
                <span className="text-xs text-primary">Required</span>
              </div>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleChange}
                className="bg-background/40 border-secondary focus:border-primary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="expiry" className="text-sm">Expiry Date</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="bg-background/40 border-secondary focus:border-primary"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="cvc" className="text-sm">CVC</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={handleChange}
                  className="bg-background/40 border-secondary focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between my-1">
              <span className="text-primary font-medium">Total:</span>
              <span className="text-lg font-bold text-primary">$19.99</span>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,170,0.3)]"
              disabled={loading}
            >
              <CreditCard className="h-4 w-4" />
              {loading ? "Processing..." : "Complete Payment & Continue"}
            </Button>
          </form>
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              256-bit SSL secured payment
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real payments are processed and no credentials are retrieved.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
