
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Upload, IndianRupee } from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  loading: boolean;
}

export interface PaymentFormData {
  transactionId: string;
  screenshotFile: File | null;
}

const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    transactionId: "",
    screenshotFile: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ 
        ...prev, 
        screenshotFile: e.target.files![0]
      }));
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!formData.transactionId) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Transaction ID Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="transactionId" className="text-sm text-white">Transaction ID</Label>
          <span className="text-xs text-[#3CEFFF]">Required</span>
        </div>
        <Input
          id="transactionId"
          name="transactionId"
          placeholder="Enter UPI transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          className="bg-[#151f32] border-[#1E293B] focus:border-[#3CEFFF] focus:ring-[#3CEFFF]/20"
          disabled={loading}
        />
        <p className="text-xs text-[#94A3B8]">
          Enter the transaction ID from your UPI payment app
        </p>
      </div>
      
      {/* Screenshot Upload */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="screenshot" className="text-sm text-white">Payment Screenshot</Label>
          <span className="text-xs text-[#3CEFFF]">Required</span>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          id="screenshot"
          name="screenshot"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
        
        <div 
          className={`rounded-lg p-4 text-center cursor-pointer transition-all ${
            formData.screenshotFile 
              ? "border-2 border-[#3CEFFF]/40 bg-[#3CEFFF]/5" 
              : "border border-[#1E293B] bg-[#151f32] hover:border-[#3CEFFF]/30"
          } ${loading ? "opacity-50 pointer-events-none" : ""}`}
          onClick={triggerFileUpload}
        >
          {formData.screenshotFile ? (
            <div className="flex flex-col items-center">
              <div className="bg-[#3CEFFF]/10 rounded-full p-2 mb-2">
                <Check className="h-5 w-5 text-[#3CEFFF]" />
              </div>
              <p className="text-sm font-medium text-white truncate max-w-full">
                {formData.screenshotFile.name}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Click to change file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-[#1a2236] rounded-full p-2 mb-2">
                <Upload className="h-5 w-5 text-[#94A3B8]" />
              </div>
              <p className="text-sm font-medium text-white">Upload Screenshot</p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Click to select a file
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6 py-6 bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-medium shadow-lg shadow-[#3CEFFF]/20 border border-[#3CEFFF]/30"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-[#080C18]/30 border-t-[#080C18] animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            <span>Complete Payment & Continue</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
