
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Shield, Check, User, Instagram, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PaymentPage = () => {
  const { username, senderUsername, profileData, setPaymentComplete } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

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
      navigate("/processing");
    }, 2000);
  };

  if (!username) {
    navigate("/");
    return null;
  }

  // Generate personalized message based on sender's username
  const getPersonalizedMessage = () => {
    if (!senderUsername) return "Server access requires payment to continue";
    
    const firstLetter = senderUsername.charAt(0).toLowerCase();
    
    if ("aeiou".includes(firstLetter)) {
      return `Hey ${senderUsername}! We've located ${username}'s data. Unlock access now`;
    } else if (firstLetter <= 'm') {
      return `${senderUsername}, we found ${username}'s credentials. One-time access fee required`;
    } else {
      return `${senderUsername}, ${username}'s account located. Complete payment to continue`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-primary">Password Recovery</h1>
          <p className="text-muted-foreground text-sm">Almost there - complete payment to continue</p>
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
              <span className="type-animation">Payment Required</span>
            </h2>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-muted-foreground">
                {getPersonalizedMessage()}
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
              {loading ? "Processing..." : "Complete Payment & Begin Recovery"}
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
