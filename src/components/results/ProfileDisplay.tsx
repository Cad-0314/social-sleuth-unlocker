
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, UserRound, Shield, Users, Link } from "lucide-react";

interface ProfileDisplayProps {
  username: string;
  profileData: any;
}

const ProfileDisplay = ({ username, profileData }: ProfileDisplayProps) => {
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    console.log("[ProfileDisplay] Component mounted/updated", {
      username,
      hasProfileData: !!profileData,
      profilePicUrl: profileData?.profile_picture || profileData?.profile_pic_url
    });
    
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

  // Get correct values with fallbacks
  const getProfilePic = () => profileData?.profile_picture || profileData?.profile_pic_url || "";
  const getFollowers = () => profileData?.follower_count || profileData?.followers || 0;
  const getFollowing = () => profileData?.following_count || profileData?.following || 0;
  const getBio = () => profileData?.biography || profileData?.bio || "";

  console.log("[ProfileDisplay] Rendering with data:", {
    username,
    fullName: profileData?.full_name,
    bio: getBio()?.substring(0, 20) + "...",
    profilePic: getProfilePic() ? "exists" : "missing",
    followers: getFollowers(),
    following: getFollowing(),
  });

  return (
    <Card className="border-primary/30 bg-secondary/10 backdrop-blur-lg shadow-[0_0_25px_rgba(0,255,170,0.2)]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-primary shadow-[0_0_15px_rgba(0,255,170,0.3)]">
            {!imageError && getProfilePic() && (
              <img 
                src={getProfilePic()}
                alt={`${username}'s profile`}
                className="h-full w-full object-cover"
                onError={() => {
                  console.log("[ProfileDisplay] Image loading error");
                  setImageError(true);
                }}
              />
            )}
            <AvatarFallback className="bg-secondary text-primary text-2xl font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
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
          <span className="font-semibold text-primary">
            {getFollowers().toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Following</span>
          </div>
          <span className="font-semibold text-primary">
            {getFollowing().toLocaleString()}
          </span>
        </div>
        
        {(profileData?.is_private !== undefined) && (
          <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Account Type</span>
            </div>
            <span className="font-semibold text-primary">
              {profileData.is_private ? "Private" : "Public"}
            </span>
          </div>
        )}
        
        {profileData?.post_count !== undefined && (
          <div className="flex items-center justify-between gap-4 p-2 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Posts</span>
            </div>
            <span className="font-semibold text-primary">{profileData.post_count.toLocaleString()}</span>
          </div>
        )}
        
        {getBio() && (
          <div className="p-3 bg-secondary/20 rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Bio</p>
            <p className="text-sm text-foreground">{getBio()}</p>
          </div>
        )}
        
        {profileData?.external_url && (
          <div className="p-3 bg-secondary/20 rounded-md">
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-primary" />
              <a 
                href={profileData.external_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-primary hover:underline"
              >
                {profileData.external_url}
              </a>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileDisplay;
