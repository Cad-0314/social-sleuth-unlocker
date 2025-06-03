
import { Lock, ShieldCheck, Youtube, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  const handleTutorialClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="bg-[#151f32] rounded-xl border border-[#1E293B] p-6">
        <div className="flex items-start gap-4">
          <div className="bg-[#3CEFFF]/10 rounded-full p-3">
            <Lock className="h-6 w-6 text-[#3CEFFF]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">
              Password Recovery Required
            </h2>
            <p className="text-[#94A3B8] leading-relaxed">
              Complete the payment of <span className="text-[#3CEFFF] font-semibold">₹229</span> to unlock the password for <span className="text-white font-medium">@{username}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Security & Time Notice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-[#0c2514] text-[#4ADE80] p-4 rounded-xl border border-[#0f3a20]">
          <ShieldCheck className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">100% Secure Payment</p>
            <p className="text-xs opacity-80">Bank-grade encryption</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-[#1a1a2e] text-[#FFA500] p-4 rounded-xl border border-[#2d2d47]">
          <Clock className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Instant Processing</p>
            <p className="text-xs opacity-80">Results within minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
