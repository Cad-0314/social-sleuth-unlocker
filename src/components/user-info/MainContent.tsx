
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";
import ProfileSection from "@/components/payment/ProfileSection";
import SecurityToken from "@/components/payment/SecurityToken";

interface MainContentProps {
  username: string;
  profileData: any;
  securityToken: string;
  onContinueToPayment: () => void;
}

const MainContent = ({ username, profileData, securityToken, onContinueToPayment }: MainContentProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-[#3CEFFF]" />
            <h1 className="text-xl font-bold text-white">Target Acquired</h1>
            <Zap className="h-5 w-5 text-[#3CEFFF]" />
          </div>
          <p className="text-[#94A3B8] text-sm">Account verification required to proceed</p>
        </div>
        
        <div className="bg-[#111827] rounded-xl border border-[#1E293B] shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a2236] to-[#1c2943] p-4 border-b border-[#1E293B]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-[#3CEFFF] rounded-full animate-pulse"></div>
                <h2 className="text-white font-bold">Target Information</h2>
              </div>
              <div className="text-xs bg-[#151f32] text-[#3CEFFF] px-2 py-1 rounded-full border border-[#1E293B]">
                Connected
              </div>
            </div>
          </div>
          
          <div className="p-5 space-y-5">
            <ProfileSection 
              username={username} 
              profileData={profileData} 
            />

            <SecurityToken securityToken={securityToken} />
            
            <Button 
              onClick={onContinueToPayment}
              className="w-full mt-6 py-6 bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-medium shadow-lg shadow-[#3CEFFF]/20 border border-[#3CEFFF]/30"
            >
              Continue to Payment Authorization
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 p-4 border-t border-[#1E293B]">
            <Shield className="h-4 w-4 text-[#94A3B8]" />
            <p className="text-xs text-[#94A3B8]">
              Secure connection established
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
