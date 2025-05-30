
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
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const upiApps = [
    { name: "Google Pay", color: "#4285f4", icon: "🇬" },
    { name: "PhonePe", color: "#5f259f", icon: "📱" },
    { name: "Paytm", color: "#002970", icon: "💳" },
    { name: "BHIM", color: "#ff6b35", icon: "🏦" },
    { name: "Amazon Pay", color: "#ff9900", icon: "📦" },
    { name: "Other UPI Apps", color: "#6b7280", icon: "💰" }
  ];

  const generateUpiLink = () => {
    // URL encode the transaction note
    const merchantName = encodeURIComponent("Firestar Password Cracker");
    const transactionNote = encodeURIComponent("Payment for Password Recovery Service");
    
    return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
  };

  const handleUpiPayment = (appName: string) => {
    const upiLink = generateUpiLink();
    
    try {
      // For web browsers, create a temporary link and click it
      const link = document.createElement('a');
      link.href = upiLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSelectedApp(appName);
      onAppSelected?.(appName);
      toast.success(`Opening ${appName} for payment`);
    } catch (error) {
      console.error('Error opening UPI app:', error);
      toast.error("Unable to open UPI app. Please try manual payment.");
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-4 w-4 text-[#3CEFFF]" />
        <h3 className="font-medium text-white">Choose UPI App</h3>
      </div>
      
      <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4">
        <p className="text-sm text-[#94A3B8] mb-4">Select your preferred UPI app to pay ₹{amount}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {upiApps.map((app) => (
            <Button
              key={app.name}
              variant="outline"
              className={`flex items-center gap-2 p-3 h-auto bg-[#1a2236] border-[#1E293B] hover:border-[#3CEFFF]/40 hover:bg-[#1E293B] text-white ${
                selectedApp === app.name ? 'border-[#3CEFFF] bg-[#3CEFFF]/10' : ''
              }`}
              onClick={() => handleUpiPayment(app.name)}
            >
              <span className="text-lg">{app.icon}</span>
              <span className="text-xs font-medium">{app.name}</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          ))}
        </div>
        
        {selectedApp && (
          <div className="bg-[#3CEFFF]/10 border border-[#3CEFFF]/20 rounded-lg p-3">
            <p className="text-sm text-[#3CEFFF] font-medium">
              ✓ {selectedApp} selected
            </p>
            <p className="text-xs text-[#94A3B8] mt-1">
              Complete the payment in {selectedApp} and return here to upload screenshot
            </p>
          </div>
        )}
        
        <div className="text-xs text-[#94A3B8] mt-3 space-y-1">
          <p>• Amount: ₹{amount}</p>
          <p>• UPI ID: {upiId}</p>
          <p>• Merchant: Firestar Password Cracker</p>
        </div>
      </div>
    </div>
  );
};

export default UpiAppChooser;
