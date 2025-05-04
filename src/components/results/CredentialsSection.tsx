
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface CredentialsSectionProps {
  username: string;
  password: string;
  securityToken: string;
}

const CredentialsSection = ({ username, password, securityToken }: CredentialsSectionProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(securityToken);
    toast.success("Security token copied to clipboard!");
  };

  // Function to partially mask sensitive data
  const maskData = (data: string, visibleChars: number = 4): string => {
    if (!data) return "";
    if (data.length <= visibleChars * 2) return data;
    
    const start = data.substring(0, visibleChars);
    const end = data.substring(data.length - visibleChars);
    const middle = "•".repeat(Math.min(data.length - (visibleChars * 2), 10));
    
    return `${start}${middle}${end}`;
  };

  return (
    <div className="space-y-2 mt-6">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        Account credentials
      </p>
      
      <div className="space-y-2 p-3 bg-secondary/20 rounded-md">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Username</p>
          <div className="bg-secondary/30 p-2 rounded font-mono text-primary text-sm">
            {username}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Password</p>
          <div 
            className="bg-secondary/30 p-2 rounded font-mono text-primary text-sm cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
          >
            <span>{showPassword ? password : maskData(password, 2)}</span>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleCopyPassword}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Security Token</p>
          <div 
            className="bg-secondary/30 p-2 rounded font-mono text-primary/90 text-xs cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
          >
            <span className="truncate">{showToken ? securityToken : maskData(securityToken, 6)}</span>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleCopyToken}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsSection;
