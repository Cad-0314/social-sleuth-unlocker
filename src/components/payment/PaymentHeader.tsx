
import { Lock } from "lucide-react";

interface PaymentHeaderProps {
  username: string;
}

const PaymentHeader = ({ username }: PaymentHeaderProps) => {
  return (
    <div className="space-y-2">
      {/* Main Header */}
      <div className="bg-[#151f32] rounded border border-[#1E293B] p-2">
        <div className="flex items-start gap-2">
          <div className="bg-[#3CEFFF]/10 rounded-full p-1">
            <Lock className="h-3 w-3 text-[#3CEFFF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white mb-0.5">
              Password Recovery Required
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Complete payment of <span className="text-[#3CEFFF] font-semibold">₹229</span> to unlock password for <span className="text-white font-medium break-all">@{username}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
