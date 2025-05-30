import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, LoaderCircle } from "lucide-react";
import { TRANSACTION_SUCCESS } from "@/config/paymentConfig";
import { Button } from "@/components/ui/button";

interface TransactionVerificationProps {
  onComplete: () => void;
  onFail: () => void;
}

const TransactionVerification = ({ onComplete, onFail }: TransactionVerificationProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const navigate = useNavigate();
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Update progress every 8ms for faster completion
    timer = setInterval(() => {
      setProgress(prev => {
        // Increased increment for faster progress
        const newValue = prev + 5;
        
        // When progress reaches 100, check transaction status
        if (newValue >= 100) {
          clearInterval(timer);
          
          // Use the flag to determine success or failure
          if (TRANSACTION_SUCCESS) {
            setStatus("success");
            // Wait just 200ms before navigating (reduced from 300ms)
            setTimeout(() => onComplete(), 200);
          } else {
            setStatus("failed");
            // Wait 200ms before showing failure (reduced from 300ms)
            setTimeout(() => onFail(), 200);
          }
          return 100;
        }
        return newValue;
      });
    }, 8); // Complete in ~0.16 seconds (20 * 8ms with increment of 5)
    
    return () => clearInterval(timer);
  }, [onComplete, onFail]);

  return (
    <div className="bg-[#151f32] p-5 rounded-lg border border-[#1E293B] flex flex-col items-center">
      {status === "loading" && (
        <>
          <LoaderCircle className="h-12 w-12 text-[#3CEFFF] animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Verifying Transaction</h3>
          <p className="text-[#94A3B8] mb-4 text-center">Please wait while we verify your payment...</p>
          <div className="w-full mb-2">
            <Progress value={progress} className="h-2 bg-[#1a2236]" />
          </div>
          <p className="text-xs text-[#94A3B8]">Do not close this window</p>
        </>
      )}
      
      {status === "success" && (
        <>
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Transaction Verified</h3>
          <p className="text-[#94A3B8] mb-4 text-center">Payment successful! Redirecting...</p>
          <Progress value={100} className="w-full h-2 bg-[#1a2236]" />
        </>
      )}
      
      {status === "failed" && (
        <>
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Transaction Failed</h3>
          <p className="text-[#94A3B8] mb-4 text-center">We couldn't verify your payment. Please try again.</p>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </>
      )}
    </div>
  );
};

export default TransactionVerification;
