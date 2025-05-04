
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, UserRound, Shield, Users } from "lucide-react";

interface ProfileDisplayProps {
  username: string;
  profileData: any;
}

const ProfileDisplay = ({ username, profileData }: ProfileDisplayProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Function to get initials from username or full name
  const getInitials = () => {
    if (profileData?.full_name) {
      return profileData.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return username?.substring(0, 2)?.toUpperCase() || "IG";
  };

  // Check if profile pic is available
  const hasProfilePic = profileData && profileData.profile_pic_url && !imageError;

  return (
    <Card className="border-primary/30 bg-secondary/10 backdrop-blur-lg shadow-[0_0_25px_rgba(0,255,170,0.2)]">
      <CardHeader>
        <div className="flex items-center gap-4">
          {hasProfilePic ? (
            <img 
              src={profileData.profile_pic_url}
              alt={username}
              onError={() => {
                console.log("Results page image load error for:", profileData.profile_pic_url);
                setImageError(true);
              }}
              className="w-20 h-20 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,170,0.3)] object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,170,0.3)] bg-secondary flex items-center justify-center text-primary text-2xl font-semibold">
              {getInitials()}
            </div>
          )}
          <div>
            <CardTitle className="text-primary flex items-center gap-2">
              @{username} 
              {profileData?.is_verified && (
                <span className="bg-primary/20 p-1 rounded-full">
                  <Check className="h-4 w-4 text-primary" />
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {profileData?.full_name || "Instagram User"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <div className="px-6 pb-4 space-y-4">
        <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Followers</span>
          </div>
          <span className="font-semibold text-primary">{profileData?.followers?.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Following</span>
          </div>
          <span className="font-semibold text-primary">{profileData?.following?.toLocaleString()}</span>
        </div>
        
        {profileData?.bio && (
          <div className="p-3 bg-secondary/20 rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Bio</p>
            <p className="text-sm text-foreground">{profileData?.bio}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileDisplay;
