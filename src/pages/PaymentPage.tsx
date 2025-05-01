
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

const PaymentPage = () => {
  const { username, setPaymentComplete } = useHackerContext();
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
            <span className="type-animation">payment required</span>
          </h2>
          
          <div className="space-y-2 mb-6">
            <p className="text-sm text-muted-foreground">
              Account: <span className="text-primary">@{username}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Server access requires a one-time fee of <span className="text-primary">$19.99</span>
            </p>
            <div className="text-xs text-muted-foreground mt-2">
              Your payment information is processed securely through our encrypted system.
              This fee covers server costs and advanced decryption tools.
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleChange}
                className="bg-background border-secondary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleChange}
                className="bg-background border-secondary"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="bg-background border-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  name="cvc"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={handleChange}
                  className="bg-background border-secondary"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2"
              disabled={loading}
            >
              <CreditCard className="h-4 w-4" />
              {loading ? "Processing..." : "Pay $19.99 & Begin Hacking"}
            </Button>
          </form>
          
          <div className="flex items-center justify-center space-x-2 mt-6">
            <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-xs text-muted-foreground">
              Your information is securely encrypted
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
