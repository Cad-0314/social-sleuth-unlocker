
import { toast } from "sonner";

export interface ProfileData {
  username: string;
  full_name: string;
  bio?: string;
  biography?: string;
  is_verified: boolean;
  is_private: boolean;
  followers?: number;
  follower_count?: number;
  following?: number;
  following_count?: number;
  post_count?: number;
  profile_pic_url?: string;
  profile_picture?: string;
  external_url?: string;
}

// Sanitize sensitive information before logging
const sanitizeForLogging = (data: any) => {
  if (!data) return null;
  
  // Create a deep copy to avoid mutating the original
  const sanitized = JSON.parse(JSON.stringify(data));
  
  // Remove potentially sensitive fields for logging
  if (sanitized.profile_pic_url) {
    sanitized.profile_pic_url = "[REDACTED URL]";
  }
  if (sanitized.profile_picture) {
    sanitized.profile_picture = "[REDACTED URL]";
  }
  
  return sanitized;
};

// Mock data to use when the API call fails due to CORS
const getMockProfileData = (username: string): ProfileData => {
  console.log("[API] Using mock data for username:", username);
  
  // Generate some random but realistic looking values
  const followerCount = Math.floor(Math.random() * 900000) + 1000;
  const followingCount = Math.floor(Math.random() * 1000) + 100;
  const postCount = Math.floor(Math.random() * 500) + 10;
  const isVerified = Math.random() > 0.8; // 20% chance of verified
  const isPrivate = Math.random() > 0.6; // 40% chance of private
  
  return {
    username: username,
    full_name: username.charAt(0).toUpperCase() + username.slice(1) + (Math.random() > 0.5 ? " " + username.split("").reverse().join("") : ""),
    biography: "This is a generated profile due to API connection issues. The real profile could not be fetched.",
    bio: "This is a generated profile due to API connection issues. The real profile could not be fetched.",
    is_verified: isVerified,
    is_private: isPrivate,
    followers: followerCount,
    follower_count: followerCount,
    following: followingCount,
    following_count: followingCount,
    post_count: postCount,
    profile_pic_url: `https://ui-avatars.com/api/?name=${username}&background=random`,
    profile_picture: `https://ui-avatars.com/api/?name=${username}&background=random`,
    external_url: "https://instagram.com"
  };
};

export async function fetchAccountDetails(username: string): Promise<ProfileData | null> {
  try {
    console.log("========= FETCH ACCOUNT DETAILS START =========");
    console.log("[API] Fetching account details for:", username);
    
    const API_ENDPOINT = "https://landa.firestars.co/api.php";
    console.log("[API] Using endpoint:", API_ENDPOINT);
    
    try {
      console.log("[API] Preparing request with username:", username);
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        // Set a short timeout so we don't wait too long if CORS is failing
        signal: AbortSignal.timeout(5000)
      });
      
      console.log("[API] Response status:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[API] Response error:", response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown error'}`);
      }
      
      const responseText = await response.text();
      console.log("[API] Raw response:", responseText.substring(0, 300) + (responseText.length > 300 ? "..." : ""));
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("[API] Successfully parsed JSON response");
      } catch (parseError) {
        console.error("[API] JSON parse error:", parseError);
        throw new Error("Failed to parse API response as JSON");
      }
      
      console.log("[API] Received response data:", sanitizeForLogging(data));
      
      // Add fallbacks for key fields to ensure compatibility
      const processedData: ProfileData = {
        username: data.username,
        full_name: data.full_name || "",
        biography: data.biography || data.bio || "",
        bio: data.biography || data.bio || "",
        is_verified: Boolean(data.is_verified),
        is_private: Boolean(data.is_private),
        profile_picture: data.profile_picture || data.profile_pic_url || "",
        profile_pic_url: data.profile_picture || data.profile_pic_url || "",
        follower_count: data.follower_count || data.followers || 0,
        followers: data.follower_count || data.followers || 0,
        following_count: data.following_count || data.following || 0,
        following: data.following_count || data.following || 0,
        post_count: data.post_count || 0,
        external_url: data.external_url || "",
      };
      
      console.log("[API] Processed profile data:", sanitizeForLogging(processedData));
      console.log("========= FETCH ACCOUNT DETAILS END: SUCCESS =========");
      
      return processedData;
    } catch (fetchError) {
      console.error("[API] Fetch error:", fetchError);
      
      // Check if it's a CORS error by looking for presence of TypeError and "Failed to fetch"
      if (fetchError instanceof TypeError && fetchError.message.includes("Failed to fetch")) {
        console.log("[API] CORS error detected, falling back to mock data");
        
        // Create mock profile data since we can't access the API due to CORS
        const mockProfile = getMockProfileData(username);
        console.log("[API] Generated mock profile:", sanitizeForLogging(mockProfile));
        
        // Show a warning toast to the user
        toast.warning("API connection failed. Using simulated profile data.", {
          duration: 5000,
        });
        
        console.log("========= FETCH ACCOUNT DETAILS END: USING MOCK DATA =========");
        return mockProfile;
      }
      
      // Handle other network errors more gracefully
      if (fetchError instanceof TypeError && fetchError.message.includes("Failed to fetch")) {
        toast.error(`Network error: Unable to connect to the API. Please try again later.`);
        throw new Error(`Network error: Unable to connect to the API for @${username}`);
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error("========= FETCH ACCOUNT DETAILS END: ERROR =========", error);
    
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to fetch account information. Please try again.");
    }
    
    return null;
  }
}
