
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Upload, IndianRupee, FileImage } from "lucide-react";
import { toast } from "sonner";

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  loading: boolean;
}

export interface PaymentFormData {
  screenshotFile: File | null;
}

const PaymentForm = ({ onSubmit, loading }: PaymentFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    screenshotFile: null
  });


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
    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-[#151f32] rounded border border-[#1E293B] p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <FileImage className="h-3 w-3 sm:h-4 sm:w-4 text-[#3CEFFF]" />
        <h3 className="text-sm font-semibold text-white">Upload Payment Proof</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-3">
          {/* Screenshot Upload */}
          <div className="space-y-1.5">
            <Label htmlFor="screenshot" className="text-xs font-medium text-white flex items-center gap-1.5">
              Payment Screenshot
              <span className="text-xs text-[#3CEFFF] bg-[#3CEFFF]/10 px-1 py-0.5 rounded">Required</span>
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
              className={`rounded p-3 text-center cursor-pointer transition-all duration-200 ${
                formData.screenshotFile 
                  ? "border border-[#3CEFFF]/40 bg-[#3CEFFF]/5" 
                  : "border border-dashed border-[#1E293B] bg-[#1a2236] hover:border-[#3CEFFF]/30 hover:bg-[#3CEFFF]/5"
              } ${loading ? "opacity-50 pointer-events-none" : ""}`}
              onClick={triggerFileUpload}
            >
              {formData.screenshotFile ? (
                <div className="flex flex-col items-center">
                  <div className="bg-[#3CEFFF]/10 rounded-full p-1.5 mb-1">
                    <Check className="h-3 w-3 text-[#3CEFFF]" />
                  </div>
                  <p className="text-xs font-medium text-white truncate max-w-full mb-0.5">
                    {formData.screenshotFile.name}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    {(formData.screenshotFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-[#1E293B] rounded-full p-2 mb-1">
                    <Upload className="h-3 w-3 text-[#94A3B8]" />
                  </div>
                  <p className="text-xs font-medium text-white mb-0.5">Upload Screenshot</p>
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
          className="w-full py-2 text-sm bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-semibold shadow-lg shadow-[#3CEFFF]/25 border border-[#3CEFFF]/30 rounded transition-all duration-200 h-auto"
          disabled={loading || !formData.screenshotFile}
        >
          {loading ? (
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border-2 border-[#080C18]/30 border-t-[#080C18] animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <IndianRupee className="h-3 w-3" />
              <span>Verify Payment & Continue</span>
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
