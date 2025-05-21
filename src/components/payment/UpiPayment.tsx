
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface UpiPaymentProps {
  upiId: string;
  qrCodeUrl: string;
}

const UpiPayment = ({ upiId, qrCodeUrl }: UpiPaymentProps) => {
  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID copied to clipboard!");
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <IndianRupee className="h-4 w-4 text-[#3CEFFF]" />
        <h3 className="font-medium text-white">UPI Payment</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* QR Code */}
        <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <QrCode className="h-4 w-4 text-[#3CEFFF]" />
            <p className="text-sm text-white">Scan QR Code</p>
          </div>
          <div className="bg-white p-3 rounded-md mb-3 border-2 border-[#3CEFFF]/20 shadow-lg shadow-[#3CEFFF]/10">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-full max-w-[180px] h-auto rounded"
            />
          </div>
          <p className="text-xs text-[#94A3B8]">
            Scan with any UPI app
          </p>
        </div>
        
        {/* UPI ID */}
        <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4">
          <p className="text-sm text-[#94A3B8] mb-3">Or pay using UPI ID</p>
          <div className="flex items-center bg-[#1a2236] p-3 rounded mb-4 border border-[#1E293B]">
            <span className="font-mono text-[#3CEFFF] flex-1 text-sm overflow-hidden text-ellipsis">
              {upiId}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-[#1E293B]"
                    onClick={handleCopyUpiId}
                  >
                    <Copy className="h-3.5 w-3.5 text-[#3CEFFF]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1a2236] text-white border-[#1E293B]">
                  <p>Copy UPI ID</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-sm bg-[#1a2236] p-3 rounded border border-[#1E293B]">
            <p className="text-[#94A3B8] mb-1">Payment Amount:</p>
            <p className="text-lg font-bold text-[#3CEFFF]">₹1499.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;
