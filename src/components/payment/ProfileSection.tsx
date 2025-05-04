
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  }, [profileData?.profile_pic_url]);

  // Function to get initials from username or full name
  const getInitials = () => {
    if (profileData?.full_name) {
      return profileData.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return username?.substring(0, 2)?.toUpperCase() || "IG";
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-secondary/20 backdrop-blur-md rounded-lg border border-primary/20 mb-4 glass-card shadow-[0_0_20px_rgba(0,255,170,0.2)]">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)] overflow-hidden bg-secondary/30 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          </div>
          
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32" />
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-secondary/30 backdrop-blur-md rounded-lg border border-primary/30 mb-4 glass-card shadow-[0_0_25px_rgba(0,255,170,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,170,0.35)] transform hover:scale-[1.01]">
      <div className="flex items-center gap-5">
        <div className="relative group">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary/50 shadow-[0_0_15px_rgba(0,255,170,0.35)] ring-2 ring-primary/20 ring-offset-2 ring-offset-background/50 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]">
            {!imageError && profileData?.profile_pic_url ? (
              <AvatarImage 
                src={profileData.profile_pic_url}
                alt={username}
                onError={() => {
                  console.log("ProfileSection image error:", profileData.profile_pic_url);
                  setImageError(true);
                }}
              />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-secondary/70 to-secondary/90 text-primary text-xl font-bold">
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
          {profileData?.is_verified && (
            <div className="absolute -bottom-1 -right-1 bg-primary/90 p-1.5 rounded-full shadow-lg">
              <Verified className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground text-xl md:text-2xl">@{username}</h3>
            {profileData?.is_verified && (
              <span className="bg-primary/20 p-1 rounded-full neon-border">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
            )}
          </div>
          
          {profileData?.full_name && (
            <p className="text-sm text-primary/90 font-medium">{profileData.full_name}</p>
          )}
          
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm hover:bg-secondary/70 transition-colors">
              <Users className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none">Followers</span>
                <span className="text-sm font-semibold text-primary">{profileData?.followers?.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm hover:bg-secondary/70 transition-colors">
              <UserRound className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-none">Following</span>
                <span className="text-sm font-semibold text-primary">{profileData?.following?.toLocaleString()}</span>
              </div>
            </div>
            
            {profileData?.is_private && (
              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm hover:bg-secondary/70 transition-colors">
                <Shield className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground leading-none">Account</span>
                  <span className="text-sm font-semibold text-primary">Private</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {profileData?.bio && (
        <div className="mt-5 p-4 bg-secondary/40 rounded-lg border border-primary/20 shadow-inner hover:bg-secondary/50 transition-all duration-300">
          <div className="flex items-center gap-1.5 mb-2">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Bio</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {profileData.bio}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
