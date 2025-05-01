
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Upload, IndianRupee } from "lucide-react";

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  loading: boolean;
  usernameError: string;
}

export interface PaymentFormData {
  transactionId: string;
  screenshotFile: File | null;
}

const PaymentForm = ({ onSubmit, loading, usernameError }: PaymentFormProps) => {
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Transaction ID Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="transactionId" className="text-sm">Transaction ID</Label>
          <span className="text-xs text-primary">Required</span>
        </div>
        <Input
          id="transactionId"
          name="transactionId"
          placeholder="Enter UPI transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          className="bg-background/40 border-secondary focus:border-primary"
        />
        <p className="text-xs text-muted-foreground">
          Enter the transaction ID from your UPI payment app
        </p>
      </div>
      
      {/* Screenshot Upload */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="screenshot" className="text-sm">Payment Screenshot</Label>
          <span className="text-xs text-primary">Required</span>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          id="screenshot"
          name="screenshot"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div 
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-all ${
            formData.screenshotFile 
              ? "border-primary/40 bg-primary/5" 
              : "border-secondary/40 hover:border-primary/30 hover:bg-secondary/10"
          }`}
          onClick={triggerFileUpload}
        >
          {formData.screenshotFile ? (
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-2 mb-2">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary truncate max-w-full">
                {formData.screenshotFile.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to change file
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-secondary/20 rounded-full p-2 mb-2">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Upload Screenshot</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to select a file or drag and drop
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between my-1">
        <span className="text-primary font-medium">Total:</span>
        <span className="text-lg font-bold text-primary">₹1499.00</span>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-4 bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,170,0.3)]"
        disabled={loading || !!usernameError}
      >
        <IndianRupee className="h-4 w-4" />
        {loading ? "Processing..." : "Complete Payment & Continue"}
      </Button>
    </form>
  );
};

export default PaymentForm;
