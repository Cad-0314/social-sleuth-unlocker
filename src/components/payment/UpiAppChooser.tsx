
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface UpiAppChooserProps {
  upiId: string;
  amount: number;
  onAppSelected?: (appName: string) => void;
}

const UpiAppChooser = ({ upiId, amount, onAppSelected }: UpiAppChooserProps) => {
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const generateUpiLink = () => {
    // URL encode the transaction note
    const merchantName = encodeURIComponent("Firestar Password Cracker");
    const transactionNote = encodeURIComponent("Payment for Password Recovery Service");
    
    return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
  };

  const handleUpiPayment = () => {
    const upiLink = generateUpiLink();
    
    try {
      // For web browsers, create a temporary link and click it
      const link = document.createElement('a');
      link.href = upiLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setPaymentInitiated(true);
      onAppSelected?.("UPI App");
      toast.success("Opening UPI apps for payment");
    } catch (error) {
      console.error('Error opening UPI app:', error);
      toast.error("Unable to open UPI app. Please try manual payment.");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Smartphone className="h-4 w-4 text-[#3CEFFF]" />
        <h3 className="font-medium text-white text-sm">Quick UPI Payment</h3>
      </div>
      
      <Button
        onClick={handleUpiPayment}
        className="w-full flex items-center justify-center gap-3 bg-[#151f32] hover:bg-[#1a2236] border border-[#3CEFFF]/30 hover:border-[#3CEFFF]/60 text-white py-3 h-auto"
        variant="outline"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🇬</span>
          <span className="text-base">📱</span>
          <span className="text-base">💳</span>
          <span className="text-base">🏦</span>
        </div>
        <span className="font-medium">Choose UPI App</span>
        <div className="flex items-center gap-1">
          <span className="text-sm text-[#3CEFFF]">₹{amount}</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </Button>
      
      {paymentInitiated && (
        <div className="bg-[#3CEFFF]/10 border border-[#3CEFFF]/20 rounded-lg p-2 mt-3">
          <p className="text-xs text-[#3CEFFF] font-medium text-center">
            ✓ Complete payment and return to upload screenshot
          </p>
        </div>
      )}
    </div>
  );
};

export default UpiAppChooser;
