
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useState } from "react";

interface UpiPaymentProps {
  upiId: string;
  qrCodeUrl: string;
}

const UpiPayment = ({ upiId, qrCodeUrl }: UpiPaymentProps) => {
  const amount = 229;
  const [showEnlargedQR, setShowEnlargedQR] = useState(false);

  const handleCopyUpiId = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(upiId);
        toast.success("UPI ID copied!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = upiId;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (success) {
          toast.success("UPI ID copied!");
        } else {
          toast.error("Failed to copy");
        }
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-2">
      {/* Payment Methods Header */}
      <div className="flex items-center gap-1">
        <IndianRupee className="h-3 w-3 text-[#3CEFFF]" />
        <h3 className="font-medium text-white text-xs">Payment Methods</h3>
      </div>
      
      {/* Centered Payment Section */}
      <div className="bg-[#151f32] rounded border border-[#1E293B] p-2 text-center">
        {/* QR Code */}
        <div className="mb-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <QrCode className="h-3 w-3 text-[#3CEFFF]" />
            <h4 className="text-xs font-medium text-white">Scan QR Code</h4>
          </div>
          
          <div 
            className="bg-white p-1 rounded mx-auto w-32 h-32 mb-1 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowEnlargedQR(true)}
          >
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-full h-full rounded"
            />
          </div>
          <p className="text-xs text-[#94A3B8]">Click to enlarge</p>
        </div>
        
        {/* UPI ID directly below QR */}
        <div className="mb-2">
          <p className="text-xs text-[#94A3B8] mb-1">UPI ID</p>
          <div className="flex items-center bg-[#1a2236] p-1 rounded border border-[#1E293B] text-xs">
            <span className="font-mono text-[#3CEFFF] flex-1 break-all">
              {upiId}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-[#1E293B] ml-1 flex-shrink-0"
                    onClick={handleCopyUpiId}
                  >
                    <Copy className="h-2 w-2 text-[#3CEFFF]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1a2236] text-white border-[#1E293B]">
                  <p className="text-xs">Copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Amount */}
        <div className="bg-[#1a2236] p-1 rounded border border-[#1E293B]">
          <p className="text-xs text-[#94A3B8] mb-0.5">Amount</p>
          <p className="text-sm font-bold text-[#3CEFFF]">₹{amount}</p>
        </div>
      </div>
      
      {/* Compact Instructions */}
      <div className="bg-[#0c2514] border border-[#0f3a20] rounded p-1.5">
        <p className="text-xs text-[#4ADE80] font-medium mb-0.5">Steps:</p>
        <p className="text-xs text-[#4ADE80]">
          1. Scan QR or copy UPI ID • 2. Pay ₹{amount} • 3. Upload screenshot below
        </p>
      </div>

      {/* Enlarged QR Modal */}
      {showEnlargedQR && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowEnlargedQR(false)}
        >
          <div className="bg-white p-4 rounded-lg">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-64 h-64 rounded"
            />
            <p className="text-center text-black text-sm mt-2">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpiPayment;
