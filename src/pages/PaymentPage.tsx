
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { Shield, Zap } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

import PaymentHeader from "@/components/payment/PaymentHeader";
import UpiPayment from "@/components/payment/UpiPayment";
import PaymentForm, { PaymentFormData } from "@/components/payment/PaymentForm";
import TransactionVerification from "@/components/payment/TransactionVerification";
import { getPaymentDetailForUser } from "@/config/paymentConfig";

const PaymentPage = () => {
  const { username, setPaymentComplete } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Get consistent payment details based on username
  const paymentDetail = getPaymentDetailForUser(username);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);

  const handlePaymentSubmit = (formData: PaymentFormData) => {
    // Validation for required fields
    if (!formData.transactionId) {
      toast.error("Please enter your transaction ID");
      return;
    }

    if (!formData.screenshotFile) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }
    
    setLoading(true);
    
    // Start verification process
    setTimeout(() => {
      setLoading(false);
      setVerifying(true);
    }, 500);
  };
  
  const handleVerificationComplete = () => {
    setPaymentComplete(true);
    navigate("/message");
  };
  
  const handleVerificationFailed = () => {
    // This will be handled within the verification component
    // by redirecting to the home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 matrix-bg">
      <div className="w-full max-w-md md:max-w-lg">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-primary">Password Recovery</h1>
            <Zap className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm">Complete payment to continue</p>
        </div>
        
        <div className="terminal-window backdrop-blur-lg bg-opacity-70 border border-primary/20 shadow-[0_0_25px_rgba(0,255,170,0.2)] transition-all hover:shadow-[0_0_30px_rgba(0,255,170,0.3)]">
          <div className="terminal-header">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
          
          <div className="p-4">
            {!verifying ? (
              <>
                <PaymentHeader username={username} />
                
                {/* UPI Payment Component with dynamic data */}
                <UpiPayment 
                  upiId={paymentDetail.upiId} 
                  qrCodeUrl={paymentDetail.qrCodeUrl} 
                />
                
                {/* Payment Form Component */}
                <PaymentForm 
                  onSubmit={handlePaymentSubmit}
                  loading={loading}
                />
              </>
            ) : (
              <TransactionVerification 
                onComplete={handleVerificationComplete}
                onFail={handleVerificationFailed}
              />
            )}
          </div>
          
          <div className="flex items-center justify-center space-x-2 mt-6 border-t border-primary/20 pt-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              256-bit SSL secured payment
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          <p>For educational purposes only. This is a simulation.</p>
          <p>No real payments are processed and no credentials are retrieved.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
