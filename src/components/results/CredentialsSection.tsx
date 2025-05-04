
import { Button } from "@/components/ui/button";
import { Copy, Shield } from "lucide-react";
import { toast } from "sonner";

interface CredentialsSectionProps {
  username: string;
  password: string;
  securityToken: string;
}

const CredentialsSection = ({ username, password, securityToken }: CredentialsSectionProps) => {
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(securityToken);
    toast.success("Security token copied to clipboard!");
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
            onClick={handleCopyPassword} 
            className="bg-secondary/30 p-2 rounded font-mono text-primary text-sm cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
          >
            <span>{password}</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Security Token</p>
          <div 
            onClick={handleCopyToken} 
            className="bg-secondary/30 p-2 rounded font-mono text-primary/90 text-xs cursor-pointer hover:bg-secondary/50 transition-colors flex justify-between items-center"
          >
            <span className="truncate">{securityToken}</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsSection;
