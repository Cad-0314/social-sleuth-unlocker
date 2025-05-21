
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, Users, UserRound, Star, RefreshCw, Shield, Verified } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileSectionProps {
  username: string;
  profileData: any;
  isLoading?: boolean;
}

const ProfileSection = ({ username, profileData, isLoading = false }: ProfileSectionProps) => {
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    // Reset image error state when profileData changes
    setImageError(false);
  }, [profileData?.profile_pic_url, profileData?.profile_picture, username, profileData]);

  // Function to get initials from username or full name
  const getInitials = () => {
    if (profileData?.full_name) {
      return profileData.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return username?.substring(0, 2)?.toUpperCase() || "IG";
  };

  // Helper functions to get correct values with fallbacks
  const getProfilePic = () => profileData?.profile_picture || profileData?.profile_pic_url || "";
  const getFollowers = () => profileData?.follower_count || profileData?.followers || 0;
  const getFollowing = () => profileData?.following_count || profileData?.following || 0;
  const getBio = () => profileData?.biography || profileData?.bio || "";

  if (isLoading) {
    return (
      <div className="p-4 bg-[#151f32] rounded-lg border border-[#1E293B] mb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full border-2 border-[#3CEFFF]/30 overflow-hidden bg-[#1a2236] flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-[#3CEFFF] animate-spin" />
          </div>
          
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32 bg-[#1a2236]" />
              <Skeleton className="h-4 w-4 rounded-full bg-[#1a2236]" />
            </div>
            <Skeleton className="h-4 w-28 bg-[#1a2236]" />
            
            <div className="flex gap-3 mt-2">
              <Skeleton className="h-8 w-24 rounded-full bg-[#1a2236]" />
              <Skeleton className="h-8 w-24 rounded-full bg-[#1a2236]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#151f32] rounded-lg border border-[#1E293B] mb-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-[#3CEFFF]/30 shadow-lg shadow-[#3CEFFF]/20">
            {!imageError && getProfilePic() && (
              <img 
                src={getProfilePic()}
                alt={`${username}'s profile`}
                className="h-full w-full object-cover rounded-full"
                onError={() => setImageError(true)}
              />
            )}
            <AvatarFallback className="bg-[#1a2236] text-[#3CEFFF] text-xl font-bold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          {profileData?.is_verified && (
            <div className="absolute -bottom-1 -right-1 bg-[#3CEFFF] p-1.5 rounded-full shadow-lg">
              <Check className="h-3 w-3 text-[#080C18]" />
            </div>
          )}
        </div>
        
        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="font-bold text-white text-xl truncate max-w-[200px]">@{username}</h3>
            {profileData?.is_verified && (
              <span className="bg-[#3CEFFF]/20 p-1 rounded-full border border-[#3CEFFF]/30">
                <Verified className="h-3.5 w-3.5 text-[#3CEFFF]" />
              </span>
            )}
          </div>
          
          {profileData?.full_name && (
            <p className="text-sm text-[#94A3B8] truncate max-w-[200px]">{profileData.full_name}</p>
          )}
          
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            <div className="flex items-center gap-2 bg-[#1a2236] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <Users className="h-3.5 w-3.5 text-[#3CEFFF]" />
              <div className="flex flex-col">
                <span className="text-xs text-[#94A3B8] leading-none">Followers</span>
                <span className="text-xs font-semibold text-white">{getFollowers().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#1a2236] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <UserRound className="h-3.5 w-3.5 text-[#3CEFFF]" />
              <div className="flex flex-col">
                <span className="text-xs text-[#94A3B8] leading-none">Following</span>
                <span className="text-xs font-semibold text-white">{getFollowing().toLocaleString()}</span>
              </div>
            </div>
            
            {profileData?.is_private && (
              <div className="flex items-center gap-2 bg-[#1a2236] px-3 py-1.5 rounded-lg border border-[#1E293B]">
                <Shield className="h-3.5 w-3.5 text-[#3CEFFF]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8] leading-none">Account</span>
                  <span className="text-xs font-semibold text-white">Private</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {getBio() && (
        <div className="mt-4 p-3 bg-[#1a2236] rounded-lg border border-[#1E293B]">
          <div className="flex items-center gap-1.5 mb-1">
            <Star className="h-3.5 w-3.5 text-[#3CEFFF]" />
            <span className="text-xs font-medium text-white">Bio</span>
          </div>
          <div className="text-xs text-[#94A3B8] break-words">
            {getBio()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
