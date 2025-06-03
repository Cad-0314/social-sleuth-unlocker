
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
    <div className="bg-[#151f32] rounded-xl border border-[#1E293B] p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileImage className="h-5 w-5 text-[#3CEFFF]" />
        <h3 className="text-lg font-semibold text-white">Upload Payment Proof</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction ID Input */}
        <div className="space-y-3">
          <Label htmlFor="transactionId" className="text-sm font-medium text-white flex items-center gap-2">
            Transaction ID
            <span className="text-xs text-[#3CEFFF] bg-[#3CEFFF]/10 px-2 py-1 rounded">Required</span>
          </Label>
          <Input
            id="transactionId"
            name="transactionId"
            placeholder="e.g., 123456789012"
            value={formData.transactionId}
            onChange={handleChange}
            className="bg-[#1a2236] border-[#1E293B] focus:border-[#3CEFFF] focus:ring-[#3CEFFF]/20 text-white placeholder:text-[#94A3B8] h-12"
            disabled={loading}
          />
          <div className="flex items-start gap-2 text-xs text-[#94A3B8]">
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <p>Find the transaction ID in your UPI app's payment history or transaction receipt</p>
          </div>
        </div>
        
        {/* Screenshot Upload */}
        <div className="space-y-3">
          <Label htmlFor="screenshot" className="text-sm font-medium text-white flex items-center gap-2">
            Payment Screenshot
            <span className="text-xs text-[#3CEFFF] bg-[#3CEFFF]/10 px-2 py-1 rounded">Required</span>
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
            className={`rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
              formData.screenshotFile 
                ? "border-2 border-[#3CEFFF]/40 bg-[#3CEFFF]/5" 
                : "border-2 border-dashed border-[#1E293B] bg-[#1a2236] hover:border-[#3CEFFF]/30 hover:bg-[#3CEFFF]/5"
            } ${loading ? "opacity-50 pointer-events-none" : ""}`}
            onClick={triggerFileUpload}
          >
            {formData.screenshotFile ? (
              <div className="flex flex-col items-center">
                <div className="bg-[#3CEFFF]/10 rounded-full p-3 mb-3">
                  <Check className="h-8 w-8 text-[#3CEFFF]" />
                </div>
                <p className="text-lg font-medium text-white truncate max-w-full mb-1">
                  {formData.screenshotFile.name}
                </p>
                <p className="text-sm text-[#94A3B8] mb-3">
                  {(formData.screenshotFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#3CEFFF]/30 text-[#3CEFFF] hover:bg-[#3CEFFF]/10"
                  onClick={triggerFileUpload}
                >
                  Change File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-[#1E293B] rounded-full p-4 mb-4">
                  <Upload className="h-8 w-8 text-[#94A3B8]" />
                </div>
                <p className="text-lg font-medium text-white mb-2">Upload Screenshot</p>
                <p className="text-sm text-[#94A3B8] mb-4">
                  Click here or drag and drop your payment screenshot
                </p>
                <p className="text-xs text-[#94A3B8]">
                  Supports: JPG, PNG, WebP (Max: 5MB)
                </p>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-4 text-lg bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-semibold shadow-lg shadow-[#3CEFFF]/25 border border-[#3CEFFF]/30 rounded-xl transition-all duration-200"
          disabled={loading || !formData.transactionId.trim() || !formData.screenshotFile}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-[#080C18]/30 border-t-[#080C18] animate-spin"></div>
              <span>Verifying Payment...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <IndianRupee className="h-5 w-5" />
              <span>Verify Payment & Continue</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
