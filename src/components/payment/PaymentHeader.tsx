
import { Lock, ShieldCheck, Clock } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  return (
    <div className="space-y-3">
      {/* Main Header */}
      <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#3CEFFF]/10 rounded-full p-2">
            <Lock className="h-5 w-5 text-[#3CEFFF]" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-1">
              Password Recovery Required
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Complete the payment of <span className="text-[#3CEFFF] font-semibold">₹229</span> to unlock the password for <span className="text-white font-medium">@{username}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Security & Time Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-[#0c2514] text-[#4ADE80] p-3 rounded-lg border border-[#0f3a20]">
          <ShieldCheck className="h-4 w-4 flex-shrink-0" />
          <div>
            <p className="font-medium text-xs">100% Secure Payment</p>
            <p className="text-xs opacity-80">Bank-grade encryption</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#1a1a2e] text-[#FFA500] p-3 rounded-lg border border-[#2d2d47]">
          <Clock className="h-4 w-4 flex-shrink-0" />
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
