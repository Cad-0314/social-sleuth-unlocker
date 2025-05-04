
import { useState } from "react";
import { Shield, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface SecurityTokenProps {
  securityToken: string;
}

const SecurityToken = ({ securityToken }: SecurityTokenProps) => {
  const [showToken, setShowToken] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(securityToken);
    toast.success("Security token copied to clipboard!");
  };

  // Function to partially mask sensitive data
  const maskToken = (token: string): string => {
    if (!token) return "";
    if (token.length <= 12) return token;
    
    const start = token.substring(0, 6);
    const end = token.substring(token.length - 6);
    const middle = "•".repeat(10);
    
    return `${start}${middle}${end}`;
  };

  return (
    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          Security Token
        </span>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 p-0 hover:bg-transparent hover:text-primary"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showToken ? "Hide" : "Show"} security token</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
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
      </div>
      <div className="bg-secondary/30 p-2 rounded text-xs font-mono text-primary/90 truncate">
        {showToken ? securityToken : maskToken(securityToken)}
      </div>
    </div>
  );
};

export default SecurityToken;
