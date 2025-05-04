
import { toast } from "sonner";

export interface ProfileData {
  username: string;
  full_name: string;
  bio: string;
  is_verified: boolean;
  is_business_account: boolean;
  followers: number;
  following: number;
  profile_pic_url: string;
  is_private: boolean;
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
  
  return sanitized;
};

// Replace Instagram profile URLs with public CDN that supports CORS
const handleProfilePicUrl = (url: string): string => {
  if (!url) return '';
  
  // For demo purposes, replace with a publicly accessible image
  // In production, you would proxy this through your own server
  return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1';
};

export async function fetchAccountDetails(username: string): Promise<ProfileData | null> {
  try {
    // Only log non-sensitive information
    console.log("Fetching account details for:", username);
    
    try {
      // Use HTTPS for production endpoints
      const API_ENDPOINT = "http://localhost:5000/"; // Should be HTTPS in production
      
      // Don't log request bodies with sensitive data
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        // Add credentials: 'same-origin' for cookies if needed
        credentials: 'same-origin',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText || 'Unknown error'}`);
      }
      
      const data = await response.json();
      
      // Process profile image URL to avoid CORS issues
      if (data && data.profile_pic_url) {
        data.profile_pic_url = handleProfilePicUrl(data.profile_pic_url);
      }
      
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
