
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Upload, IndianRupee, FileImage, AlertCircle } from "lucide-react";
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
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setFormData(prev => ({ 
        ...prev, 
        screenshotFile: file
      }));
      toast.success("Screenshot uploaded successfully");
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
    if (!formData.transactionId.trim()) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (formData.transactionId.length < 8) {
      toast.error("Transaction ID must be at least 8 characters");
      return;
    }

    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-[#151f32] rounded-lg border border-[#1E293B] p-4">
      <div className="flex items-center gap-2 mb-4">
        <FileImage className="h-4 w-4 text-[#3CEFFF]" />
        <h3 className="text-base font-semibold text-white">Upload Payment Proof</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Transaction ID Input */}
          <div className="space-y-2">
            <Label htmlFor="transactionId" className="text-xs font-medium text-white flex items-center gap-2">
              Transaction ID
              <span className="text-xs text-[#3CEFFF] bg-[#3CEFFF]/10 px-1.5 py-0.5 rounded">Required</span>
            </Label>
            <Input
              id="transactionId"
              name="transactionId"
              placeholder="e.g., 123456789012"
              value={formData.transactionId}
              onChange={handleChange}
              className="bg-[#1a2236] border-[#1E293B] focus:border-[#3CEFFF] focus:ring-[#3CEFFF]/20 text-white placeholder:text-[#94A3B8] h-10"
              disabled={loading}
            />
            <div className="flex items-start gap-1 text-xs text-[#94A3B8]">
              <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <p>Find the transaction ID in your UPI app's payment history</p>
            </div>
          </div>
          
          {/* Screenshot Upload */}
          <div className="space-y-2">
            <Label htmlFor="screenshot" className="text-xs font-medium text-white flex items-center gap-2">
              Payment Screenshot
              <span className="text-xs text-[#3CEFFF] bg-[#3CEFFF]/10 px-1.5 py-0.5 rounded">Required</span>
            </Label>
            
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
              className={`rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
                formData.screenshotFile 
                  ? "border border-[#3CEFFF]/40 bg-[#3CEFFF]/5" 
                  : "border border-dashed border-[#1E293B] bg-[#1a2236] hover:border-[#3CEFFF]/30 hover:bg-[#3CEFFF]/5"
              } ${loading ? "opacity-50 pointer-events-none" : ""}`}
              onClick={triggerFileUpload}
            >
              {formData.screenshotFile ? (
                <div className="flex flex-col items-center">
                  <div className="bg-[#3CEFFF]/10 rounded-full p-2 mb-2">
                    <Check className="h-5 w-5 text-[#3CEFFF]" />
                  </div>
                  <p className="text-sm font-medium text-white truncate max-w-full mb-1">
                    {formData.screenshotFile.name}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    {(formData.screenshotFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-[#1E293B] rounded-full p-3 mb-2">
                    <Upload className="h-5 w-5 text-[#94A3B8]" />
                  </div>
                  <p className="text-sm font-medium text-white mb-1">Upload Screenshot</p>
                  <p className="text-xs text-[#94A3B8]">
                    JPG, PNG, WebP (Max: 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 text-base bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-semibold shadow-lg shadow-[#3CEFFF]/25 border border-[#3CEFFF]/30 rounded-lg transition-all duration-200"
          disabled={loading || !formData.transactionId.trim() || !formData.screenshotFile}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-[#080C18]/30 border-t-[#080C18] animate-spin"></div>
              <span>Verifying Payment...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              <span>Verify Payment & Continue</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
