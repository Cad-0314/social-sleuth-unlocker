
import { Lock, ShieldCheck, Clock } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  return (
    <div className="space-y-2">
      {/* Main Header */}
      <div className="bg-[#151f32] rounded border border-[#1E293B] p-3">
        <div className="flex items-start gap-2">
          <div className="bg-[#3CEFFF]/10 rounded-full p-1.5">
            <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-[#3CEFFF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white mb-1">
              Password Recovery Required
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Complete payment of <span className="text-[#3CEFFF] font-semibold">₹229</span> to unlock password for <span className="text-white font-medium break-all">@{username}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Security & Time Notice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 bg-[#0c2514] text-[#4ADE80] p-2 rounded border border-[#0f3a20]">
          <ShieldCheck className="h-3 w-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-xs">100% Secure</p>
            <p className="text-xs opacity-80">Bank-grade encryption</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-[#1a1a2e] text-[#FFA500] p-2 rounded border border-[#2d2d47]">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-xs">Instant Processing</p>
            <p className="text-xs opacity-80">Results within minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
