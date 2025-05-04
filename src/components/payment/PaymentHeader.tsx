
import { Lock, ShieldCheck } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold mb-2 text-primary flex items-center gap-2 p-2 bg-primary/10 rounded-md shadow-sm">
        <Lock className="h-4 w-4" />
        <span className="type-animation">Payment Required</span>
      </h2>
      
      <div className="space-y-3 mb-4">
        <p className="text-sm text-white">
          Complete payment to begin password recovery for @{username}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs bg-green-900/30 text-green-400 p-2 rounded border border-green-900/40 shadow-[0_0_10px_rgba(0,255,128,0.2)]">
            <ShieldCheck className="h-4 w-4" />
            <span>Secure, encrypted payment process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
