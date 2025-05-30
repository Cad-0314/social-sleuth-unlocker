
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import UpiAppChooser from "./UpiAppChooser";

interface UpiPaymentProps {
  upiId: string;
  qrCodeUrl: string;
}

const UpiPayment = ({ upiId, qrCodeUrl }: UpiPaymentProps) => {
  const amount = 1499;

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

  const handleAppSelected = (appName: string) => {
    console.log(`User selected ${appName} for payment`);
  };

  return (
    <div className="mb-4 space-y-4">
      {/* UPI App Chooser */}
      <UpiAppChooser 
        upiId={upiId} 
        amount={amount} 
        onAppSelected={handleAppSelected}
      />
      
      {/* Alternative Payment Methods */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-[#3CEFFF]" />
          <h3 className="font-medium text-white text-sm">Alternative Methods</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* QR Code */}
          <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-3 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-2">
              <QrCode className="h-3 w-3 text-[#3CEFFF]" />
              <p className="text-xs text-white">Scan QR</p>
            </div>
            <div className="bg-white p-2 rounded border border-[#3CEFFF]/20">
              <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-full max-w-[120px] h-auto rounded"
              />
            </div>
          </div>
          
          {/* UPI ID */}
          <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-3">
            <p className="text-xs text-[#94A3B8] mb-2">Manual UPI ID</p>
            <div className="flex items-center bg-[#1a2236] p-2 rounded mb-2 border border-[#1E293B]">
              <span className="font-mono text-[#3CEFFF] flex-1 text-xs overflow-hidden text-ellipsis">
                {upiId}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-[#1E293B]"
                      onClick={handleCopyUpiId}
                    >
                      <Copy className="h-2.5 w-2.5 text-[#3CEFFF]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1a2236] text-white border-[#1E293B]">
                    <p className="text-xs">Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-xs bg-[#1a2236] p-2 rounded border border-[#1E293B] text-center">
              <p className="text-[#3CEFFF] font-bold">₹{amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpiPayment;
