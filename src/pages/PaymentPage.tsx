
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHackerContext } from "@/context/HackerContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Check, Lock, Users, UserRound, Copy, IndianRupee, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

// Demo predefined security strings - same as in ResultsPage
const securityStrings = [
  "IGQVJYeEhyekRIa0JZAWE9kOVBMcFZART1RuX05wS2gyTVB5RVkwVk9sVDZAneUNkdFd0LVdwb0wyRU5JRjV1eTREMTZA5TkNFenlXQjZAyU",
  "IGQVJWVDlaNk5aY0drMF9jYjBESVRkYjE2ZAFl6S0JRWkhpeUVaeGtyaXFkcUc1VWVxZAGpFMXVzQU03NTNVN0dVMmh4R3NhRkhxWElNN",
  "IGQVJWUDRVOXZAkdm5vZAjJxTGNwMElEbExjWlNHS2d0N2xvaFZAPUmp1NFROaXBJaDNsZAXdGS0lfRklNclJKUThrNVRmSUJTMFJVbmNRN",
  "IGQVJYWFc0NmxYR1lfODlNNHJ3Nl81WGxQX3p4UWtHMFNMYVUyVnJjY2N1NUFnMXVpY1ZAER1RVZAGRVY3YmJCWEhEZAkRRLW5hNjNzN",
  "IGQVJXd0MxTlJxbVUySlNxTkxtcXVwOWsxQXZApQ1Q0eTljZA1dNNXh0ZA3hOb3NORl81c0V3LVdpaG9UNFNRc0pyQVpXQU9YbW83QWxMN"
];

// UPI Payment details
const UPI_ID = "yourupiid@upi";
const QR_CODE_URL = "https://placehold.co/300x300?text=UPI+QR+CODE";

const PaymentPage = () => {
  const { username, profileData, setPaymentComplete } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    upiId: "",
    transactionId: "",
    screenshotFile: null as File | null
  });

  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      // Validate username format
      if (username.includes(" ")) {
        setUsernameError("Username cannot contain spaces");
      } else if (username.length < 3) {
        setUsernameError("Username must be at least 3 characters long");
      } else {
        setUsernameError("");
      }
    }
  }, [navigate, username]);

  // Get a security token based on username
  const getSecurityToken = () => {
    if (!username) return securityStrings[0];
    const firstChar = username.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % securityStrings.length;
    return securityStrings[index];
  };

  const securityToken = getSecurityToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ 
        ...prev, 
        screenshotFile: e.target.files![0]
      }));
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!formData.transactionId) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
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

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
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
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)]">
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
                
                {usernameError && (
                  <p className="text-xs text-red-500">{usernameError}</p>
                )}
                
                {profileData?.full_name && (
                  <p className="text-sm text-muted-foreground">{profileData.full_name}</p>
                )}
                
                <div className="flex flex-wrap gap-4 mt-2">
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs bg-green-900/20 text-green-400 p-2 rounded border border-green-900/30">
                  <Shield className="h-4 w-4" />
                  <span>Secure, encrypted payment process</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* UPI Payment Method */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="h-5 w-5 text-primary" />
              <h3 className="font-medium">UPI Payment</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column - QR Code */}
              <Card className="p-4 border border-secondary/40 bg-secondary/10 flex flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground mb-2">Scan QR Code</p>
                <div className="bg-white p-2 rounded-md mb-2">
                  <img 
                    src={QR_CODE_URL} 
                    alt="UPI QR Code" 
                    className="w-full max-w-[200px] h-auto rounded"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan with any UPI app
                </p>
              </Card>
              
              {/* Right column - UPI ID */}
              <Card className="p-4 border border-secondary/40 bg-secondary/10 flex flex-col">
                <p className="text-sm text-muted-foreground mb-2">Or pay using UPI ID</p>
                <div className="flex items-center bg-secondary/30 p-2 rounded mb-3">
                  <span className="font-mono text-primary flex-1 text-sm overflow-hidden text-ellipsis">
                    {UPI_ID}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={handleCopyUpiId}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy UPI ID</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-xs bg-primary/10 p-2 rounded border border-primary/20 mt-auto">
                  <p className="font-medium text-primary mb-1">Payment Amount:</p>
                  <p className="text-lg font-bold text-primary">₹1499.00</p>
                </div>
              </Card>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction ID Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="transactionId" className="text-sm">Transaction ID</Label>
                <span className="text-xs text-primary">Required</span>
              </div>
              <Input
                id="transactionId"
                name="transactionId"
                placeholder="Enter UPI transaction ID"
                value={formData.transactionId}
                onChange={handleChange}
                className="bg-background/40 border-secondary focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Enter the transaction ID from your UPI payment app
              </p>
            </div>
            
            {/* Screenshot Upload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="screenshot" className="text-sm">Payment Screenshot</Label>
                <span className="text-xs text-primary">Required</span>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                id="screenshot"
                name="screenshot"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div 
                className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-all ${
                  formData.screenshotFile 
                    ? "border-primary/40 bg-primary/5" 
                    : "border-secondary/40 hover:border-primary/30 hover:bg-secondary/10"
                }`}
                onClick={triggerFileUpload}
              >
                {formData.screenshotFile ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full p-2 mb-2">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-primary truncate max-w-full">
                      {formData.screenshotFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="bg-secondary/20 rounded-full p-2 mb-2">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Upload Screenshot</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to select a file or drag and drop
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between my-1">
              <span className="text-primary font-medium">Total:</span>
              <span className="text-lg font-bold text-primary">₹1499.00</span>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,170,0.3)]"
              disabled={loading || !!usernameError}
            >
              <IndianRupee className="h-4 w-4" />
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
