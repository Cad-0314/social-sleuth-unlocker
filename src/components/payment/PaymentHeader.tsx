
import { Lock, ShieldCheck } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4 mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-[#3CEFFF]" />
          <span>Payment Required</span>
        </h2>
        
        <p className="text-sm text-[#94A3B8]">
          Complete payment to begin password recovery for @{username}
        </p>
      </div>
      
      <div className="flex items-center gap-2 mb-3 bg-[#0c2514] text-[#4ADE80] p-2.5 rounded border border-[#0f3a20] text-xs">
        <ShieldCheck className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium">Secure, encrypted payment process</span>
      </div>
    </div>
  );
};

export default PaymentHeader;
