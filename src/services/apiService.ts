
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

/**
 * Handle profile picture URLs with CORS issues
 */
const handleProfilePicUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    // Return the URL directly since it's already proxied
    return url;
  } catch (error) {
    console.error("Error handling profile image URL:", error);
    // Fallback image in case of errors
    return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1';
  }
};

export async function fetchAccountDetails(username: string): Promise<ProfileData | null> {
  try {
    // Only log non-sensitive information
    console.log("Fetching account details for:", username);
    
    try {
      const API_ENDPOINT = "https://landa.firestars.co/api.php";
      
      // Don't log request bodies with sensitive data
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown error'}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      // Log sanitized data without sensitive information
      console.log("Received profile data:", sanitizeForLogging(data));
      
      return data;
    } catch (fetchError) {
      console.error("API fetch error:", fetchError);
      
      // Handle network errors more gracefully
      if (fetchError instanceof TypeError && fetchError.message.includes("Failed to fetch")) {
        throw new Error(`Invalid account details for @${username}. Please check the username and try again.`);
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Error fetching account details:", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to fetch account information. Please try again.");
    }
    return null;
  }
}
