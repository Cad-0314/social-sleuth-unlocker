
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

  const handleTutorialClick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#3CEFFF]/60"></div>
          <LockKeyhole className="h-6 w-6 text-[#3CEFFF]" />
          <h1 className="text-2xl font-bold text-white">Secure Payment</h1>
          <div className="h-px w-16 bg-[#3CEFFF]/60"></div>
        </div>

        {/* Tutorial Button */}
        <div className="text-center mb-6">
          <Button
            onClick={handleTutorialClick}
            variant="secondary"
            className="bg-[#151f32] hover:bg-[#1a2236] text-white border border-[#3CEFFF]/20 py-3 px-6"
          >
            <Youtube className="h-5 w-5 mr-2" />
            How to Pay - Watch Tutorial
          </Button>
        </div>
        
        <div className="bg-[#111827] rounded-2xl border border-[#1E293B] shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a2236] to-[#1c2943] p-4 sm:p-6 border-b border-[#1E293B]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">@{username}</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Password Recovery Service</p>
              </div>
              <div className="bg-[#151f32] p-3 rounded-xl border border-[#1E293B]">
                <p className="text-lg font-bold text-[#3CEFFF]">₹229</p>
                <p className="text-xs text-[#94A3B8]">One-time</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {!verifying ? (
              <div className="space-y-6">
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
          
          <div className="border-t border-[#1E293B] p-4 flex items-center justify-center gap-2 bg-[#0f1724]">
            <Shield className="h-4 w-4 text-[#94A3B8]" />
            <p className="text-sm text-[#94A3B8]">256-bit SSL encrypted secure payment</p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-[#94A3B8]">
          <p>© 2025 Firestars.co - Secure Digital Services</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
