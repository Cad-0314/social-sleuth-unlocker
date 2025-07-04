
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHackerContext } from "@/context/HackerContext";
import { Shield, Zap, LockKeyhole, Youtube } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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

  const handleTutorialClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-2 sm:px-4 py-2 sm:py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-8 sm:w-16 bg-[#3CEFFF]/60"></div>
          <LockKeyhole className="h-4 w-4 text-[#3CEFFF]" />
          <h1 className="text-sm sm:text-lg font-bold text-white">Secure Payment</h1>
          <div className="h-px w-8 sm:w-16 bg-[#3CEFFF]/60"></div>
        </div>

        {/* Tutorial Button */}
        <div className="text-center mb-3">
          <Button
            onClick={handleTutorialClick}
            variant="secondary"
            className="bg-[#151f32] hover:bg-[#1a2236] text-white border border-[#3CEFFF]/20 py-1.5 px-3 text-xs sm:text-sm h-auto"
          >
            <Youtube className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
            How to Pay - Tutorial
          </Button>
        </div>
        
        <div className="bg-[#111827] rounded-lg border border-[#1E293B] shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a2236] to-[#1c2943] p-3 border-b border-[#1E293B]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white">@{username}</h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">Password Recovery Service</p>
              </div>
              <div className="bg-[#151f32] p-2 rounded border border-[#1E293B]">
                <p className="text-sm sm:text-base font-bold text-[#3CEFFF]">₹229</p>
                <p className="text-xs text-[#94A3B8]">One-time</p>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            {!verifying ? (
              <div className="space-y-3">
                <PaymentHeader username={username} />
                <UpiPayment 
                  upiId={paymentDetail.upiId} 
                  qrCodeUrl={paymentDetail.qrCodeUrl} 
                />
                <PaymentForm 
                  onSubmit={handlePaymentSubmit}
                  loading={loading}
                />
              </div>
            ) : (
              <TransactionVerification 
                onComplete={handleVerificationComplete}
                onFail={handleVerificationFailed}
              />
            )}
          </div>
          
          <div className="border-t border-[#1E293B] p-2 flex items-center justify-center gap-1.5 bg-[#0f1724]">
            <Shield className="h-3 w-3 text-[#94A3B8]" />
            <p className="text-xs text-[#94A3B8]">256-bit SSL encrypted secure payment</p>
          </div>
        </div>
        
        <div className="mt-3 text-center text-xs text-[#94A3B8]">
          <p>© 2025 Firestars.co - Secure Digital Services</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
