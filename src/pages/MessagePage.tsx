
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHackerContext } from "@/context/HackerContext";
import { toast } from "sonner";
import { ArrowRight, Copy, Check, Info, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const MessagePage = () => {
  const { username, profileData } = useHackerContext();
  const [loading, setLoading] = useState(false);
  const [senderUsername, setSenderUsername] = useState("");
  const [randomMessage, setRandomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const nonsenseMessages = [
    "k3yVlt nw wkdmx plz",
    "frzn br0k3 nfly",
    "bzzp klonk verify",
    "skrrt vroom access",
    "j4zz h4nd m00n"
  ];
  
  useEffect(() => {
    if (!username || !profileData) {
      navigate("/");
      return;
    }
    
    // Only set the random message if it hasn't been set yet
    if (!randomMessage) {
      const randomIndex = Math.floor(Math.random() * nonsenseMessages.length);
      setRandomMessage(nonsenseMessages[randomIndex]);
    }
  }, [username, profileData, navigate, nonsenseMessages, randomMessage]);
  
  const handleCopyMessage = async () => {
    try {
      // Check if we're using secure context (modern browsers requirement)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(randomMessage);
        setCopied(true);
        toast.success("Message copied to clipboard!");
      } else {
        // Fallback for mobile browsers that don't support clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = randomMessage;
        
        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();

        // Use the older execCommand method for copying
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (success) {
          setCopied(true);
          toast.success("Message copied to clipboard!");
        } else {
          toast.error("Failed to copy to clipboard");
        }
      }
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderUsername) {
      toast.error("Please enter your username");
      return;
    }
    
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      navigate("/processing");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#080C18] to-[#101729] px-4 py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-[#111827] backdrop-blur-md rounded-xl border border-[#1E293B] shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a2236] to-[#1c2943] p-5 border-b border-[#1E293B]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="h-2 w-2 bg-[#3CEFFF] rounded-full animate-pulse"></div>
              Verification Required
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">Send this code to complete verification</p>
          </div>
          
          {/* Profile Section */}
          <div className="p-5">
            <div className="flex items-center space-x-3 p-3 bg-[#151f32] rounded-lg mb-6 border border-[#1E293B]">
              <Avatar className="h-14 w-14 border-2 border-[#3CEFFF]/30">
                <AvatarImage src={profileData?.profile_pic_url} alt={username} />
                <AvatarFallback className="bg-[#1a2236] text-[#3CEFFF]">
                  {username?.substring(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">@{username}</p>
                <p className="text-sm text-[#94A3B8]">
                  {profileData?.followers?.toLocaleString() || "—"} followers
                </p>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="space-y-5">
              <div className="rounded-lg bg-[#151f32]/60 p-4 border border-[#1E293B]">
                <div className="flex items-center gap-2 text-[#3CEFFF] mb-2">
                  <Info className="h-4 w-4" />
                  <h3 className="font-medium">Verification Instructions</h3>
                </div>
                <p className="text-sm text-[#94A3B8]">
                  To verify your account, send the exact message below to <span className="text-white font-semibold">@{username}</span> from your Instagram account.
                </p>
              </div>
              
              {/* Verification Code */}
              <div className="overflow-hidden rounded-lg border border-[#1E293B]">
                <div className="bg-[#151f32]/80 px-4 py-2 border-b border-[#1E293B] flex justify-between items-center">
                  <span className="text-xs font-medium text-[#94A3B8]">VERIFICATION CODE</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyMessage}
                    className="h-7 text-xs hover:bg-[#1E293B]"
                  >
                    {copied ? <Check className="h-3 w-3 mr-1 text-[#3CEFFF]" /> : <Copy className="h-3 w-3 mr-1 text-[#3CEFFF]" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="p-4 bg-[#151f32]/30 font-mono flex justify-center items-center">
                  <p className="text-[#3CEFFF] font-bold tracking-wider text-center select-all break-all">{randomMessage}</p>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-[#94A3B8] mt-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#3CEFFF] mr-2"></div>
                <p>This code helps us verify that you own the account</p>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-white flex items-center gap-2">
                  Your Instagram Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]">@</span>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={senderUsername}
                    onChange={(e) => setSenderUsername(e.target.value)}
                    className="pl-8 bg-[#151f32] border-[#1E293B] focus:border-[#3CEFFF] focus:ring-[#3CEFFF]/20"
                  />
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Enter the username you used to send the message
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full gap-2 py-5 bg-gradient-to-r from-[#3CEFFF] to-[#2E7CF6] hover:from-[#3CEFFF] hover:to-[#4B89F2] text-[#080C18] font-medium shadow-lg shadow-[#3CEFFF]/20 border border-[#3CEFFF]/30"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-[#080C18]/30 border-t-[#080C18] animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    I've Sent The Message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-5 pt-5 border-t border-[#1E293B] text-center">
              <p className="text-xs text-[#94A3B8]">Secure connection established</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
