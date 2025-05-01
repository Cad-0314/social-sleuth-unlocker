
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Users, UserRound } from "lucide-react";

interface ProfileSectionProps {
  username: string;
  profileData: any;
}

const ProfileSection = ({ username, profileData }: ProfileSectionProps) => {
  return (
    <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 mb-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/30 shadow-[0_0_15px_rgba(0,255,170,0.3)]">
          <AvatarImage src={profileData?.profile_pic_url} alt={username} className="object-cover" />
          <AvatarFallback className="bg-secondary text-primary text-lg">
            {username?.substring(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">@{username}</h3>
            {profileData?.is_verified && (
              <span className="bg-primary/20 p-0.5 rounded">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
            )}
          </div>
          
          {profileData?.full_name && (
            <p className="text-sm text-muted-foreground">{profileData.full_name}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-primary/80" />
              <span className="text-xs text-muted-foreground">Followers:</span>
              <span className="text-xs font-medium text-primary">{profileData?.followers?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <UserRound className="h-4 w-4 text-primary/80" />
              <span className="text-xs text-muted-foreground">Following:</span>
              <span className="text-xs font-medium text-primary">{profileData?.following?.toLocaleString()}</span>
            </div>
          </div>
          
          {profileData?.bio && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {profileData.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
