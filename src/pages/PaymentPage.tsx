
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { Shield, Zap, LockKeyhole } from "lucide-react";
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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-4 py-8 sm:px-6 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-12 bg-[#3CEFFF]/60"></div>
          <LockKeyhole className="h-5 w-5 text-[#3CEFFF]" />
          <h1 className="text-xl font-bold text-white">Payment Gateway</h1>
          <div className="h-px w-12 bg-[#3CEFFF]/60"></div>
        </div>
        
        <div className="bg-[#111827] rounded-xl border border-[#1E293B] shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a2236] to-[#1c2943] p-4 sm:p-5 border-b border-[#1E293B] flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold">@{username}</h2>
              <p className="text-xs text-[#94A3B8] mt-1">Password recovery service</p>
            </div>
            <div className="bg-[#151f32] p-2 rounded-lg border border-[#1E293B]">
              <p className="text-sm font-bold text-[#3CEFFF]">₹1499</p>
            </div>
          </div>
          
          <div className="p-5 max-h-[calc(100vh-200px)] overflow-y-auto">
            {!verifying ? (
              <>
                <PaymentHeader username={username} />
                <UpiPayment 
                  upiId={paymentDetail.upiId} 
                  qrCodeUrl={paymentDetail.qrCodeUrl} 
                />
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
          
          <div className="border-t border-[#1E293B] p-4 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-[#94A3B8]" />
            <p className="text-xs text-[#94A3B8]">Secure payment</p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-[#94A3B8]">
          <p>© 2025 Firestars.co</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
