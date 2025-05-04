
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Users, UserRound, Star, RefreshCw } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 mb-4 glass-card neon-border">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)] overflow-hidden bg-secondary/50 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-primary animate-spin" />
          </div>
          
          <div className="space-y-3 flex-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-40" />
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 mb-4 glass-card neon-border">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)]">
          {profileData?.profile_pic_url && !imageError ? (
            <AvatarImage 
              src={profileData.profile_pic_url}
              alt={username} 
              className="object-cover"
              onError={() => {
                console.log("Image failed to load:", profileData.profile_pic_url);
                setImageError(true);
              }}
            />
          ) : null}
          <AvatarFallback className="bg-secondary text-primary text-lg">
            {username?.substring(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">@{username}</h3>
            {profileData?.is_verified && (
              <span className="bg-primary/20 p-0.5 rounded neon-border">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
            )}
          </div>
          
          {profileData?.full_name && (
            <p className="text-sm text-muted-foreground">{profileData.full_name}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-full">
              <Users className="h-4 w-4 text-primary/80" />
              <span className="text-xs text-muted-foreground">Followers:</span>
              <span className="text-xs font-medium text-primary">{profileData?.followers?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-full">
              <UserRound className="h-4 w-4 text-primary/80" />
              <span className="text-xs text-muted-foreground">Following:</span>
              <span className="text-xs font-medium text-primary">{profileData?.following?.toLocaleString()}</span>
            </div>
          </div>
          
          {profileData?.bio && (
            <div className="mt-2 p-2 bg-secondary/10 rounded border border-secondary/20">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 text-primary/80" />
                <span className="text-xs text-primary">Bio</span>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {profileData.bio}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
