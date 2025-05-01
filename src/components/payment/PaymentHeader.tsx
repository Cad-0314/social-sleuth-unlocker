
import { Lock } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
  usernameError?: string;
}

const PaymentHeader = ({ username, usernameError }: PaymentHeaderProps) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold mb-2 text-primary flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <span className="type-animation">Payment Required</span>
      </h2>
      
      <div className="space-y-3 mb-4">
        <p className="text-sm text-muted-foreground">
          Complete payment to begin password recovery for @{username}
        </p>
        
        {usernameError && (
          <p className="text-xs text-red-500 bg-red-900/20 p-2 rounded border border-red-900/30">
            {usernameError}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs bg-green-900/20 text-green-400 p-2 rounded border border-green-900/30">
            <Lock className="h-4 w-4" />
            <span>Secure, encrypted payment process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
