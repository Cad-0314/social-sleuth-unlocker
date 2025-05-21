
import { Copy, IndianRupee, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <IndianRupee className="h-5 w-5 text-primary" />
        <h3 className="font-medium">UPI Payment</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column - QR Code */}
        <Card className="p-4 border border-secondary/40 bg-secondary/10 flex flex-col items-center justify-center glass-card scanner-effect">
          <div className="flex items-center gap-2 mb-2">
            <QrCode className="h-4 w-4 text-primary" />
            <p className="text-sm">Scan QR Code</p>
          </div>
          <div className="bg-white p-2 rounded-md mb-2 neon-border">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-full max-w-[200px] h-auto rounded"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Scan with any UPI app
          </p>
        </Card>
        
        {/* Right column - UPI ID */}
        <Card className="p-4 border border-secondary/40 bg-secondary/10 flex flex-col glass-card scanner-effect">
          <p className="text-sm text-muted-foreground mb-2">Or pay using UPI ID</p>
          <div className="flex items-center bg-secondary/30 p-2 rounded mb-3 neon-border">
            <span className="font-mono text-primary flex-1 text-sm overflow-hidden text-ellipsis">
              {upiId}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={handleCopyUpiId}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy UPI ID</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-xs bg-primary/10 p-2 rounded border border-primary/20 mt-auto neon-border">
            <p className="font-medium text-primary mb-1">Payment Amount:</p>
            <p className="text-lg font-bold text-primary">₹1499.00</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpiPayment;
