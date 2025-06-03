
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
  const amount = 229;

  const handleCopyUpiId = async () => {
    try {
      // Check if we're using secure context (modern browsers requirement)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(upiId);
        toast.success("UPI ID copied to clipboard!");
      } else {
        // Fallback for mobile browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = upiId;
        
        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();

        // Use the older execCommand method for copying
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (success) {
          toast.success("UPI ID copied to clipboard!");
        } else {
          toast.error("Failed to copy to clipboard");
        }
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Payment Methods Header */}
      <div className="flex items-center gap-2 mb-4">
        <IndianRupee className="h-5 w-5 text-[#3CEFFF]" />
        <h3 className="font-semibold text-white text-lg">Payment Methods</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* QR Code Section */}
        <div className="bg-[#151f32] rounded-xl border border-[#1E293B] p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-5 w-5 text-[#3CEFFF]" />
            <h4 className="text-lg font-medium text-white">Scan QR Code</h4>
          </div>
          
          <div className="bg-white p-4 rounded-lg mx-auto max-w-[200px] mb-4">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-full h-auto rounded"
            />
          </div>
          
          <div className="bg-[#1a2236] p-3 rounded-lg border border-[#1E293B]">
            <p className="text-sm text-[#94A3B8] mb-1">Amount</p>
            <p className="text-xl font-bold text-[#3CEFFF]">₹{amount}</p>
          </div>
          
          <p className="text-xs text-[#94A3B8] mt-3">
            Open any UPI app and scan this QR code to pay
          </p>
        </div>
        
        {/* Manual UPI Section */}
        <div className="bg-[#151f32] rounded-xl border border-[#1E293B] p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <IndianRupee className="h-5 w-5 text-[#3CEFFF]" />
            <h4 className="text-lg font-medium text-white">Manual Payment</h4>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#94A3B8] mb-2">UPI ID</p>
              <div className="flex items-center bg-[#1a2236] p-3 rounded-lg border border-[#1E293B]">
                <span className="font-mono text-[#3CEFFF] flex-1 text-sm">
                  {upiId}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-[#1E293B] ml-2"
                        onClick={handleCopyUpiId}
                      >
                        <Copy className="h-4 w-4 text-[#3CEFFF]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1a2236] text-white border-[#1E293B]">
                      <p className="text-xs">Copy UPI ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-[#94A3B8] mb-2">Amount</p>
              <div className="bg-[#1a2236] p-3 rounded-lg border border-[#1E293B] text-center">
                <p className="text-xl font-bold text-[#3CEFFF]">₹{amount}</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-[#94A3B8] mt-4 text-center">
            Copy the UPI ID and use it in your UPI app to send payment
          </p>
        </div>
      </div>
      
      {/* Payment Instructions */}
      <div className="bg-[#0c2514] border border-[#0f3a20] rounded-lg p-4">
        <h5 className="text-sm font-medium text-[#4ADE80] mb-2">Payment Instructions:</h5>
        <ol className="text-xs text-[#4ADE80] space-y-1 list-decimal list-inside">
          <li>Choose either QR code scan or manual UPI payment</li>
          <li>Complete the payment of ₹{amount}</li>
          <li>Take a screenshot of the successful transaction</li>
          <li>Fill in the transaction details below and upload the screenshot</li>
        </ol>
      </div>
    </div>
  );
};

export default UpiPayment;
