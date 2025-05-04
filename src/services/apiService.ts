
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

/**
 * Handle profile picture URLs with CORS issues
 * 
 * In a production environment, this should be replaced with:
 * 1. Server-side proxy that fetches the image and serves it from your domain
 * 2. A base64 encoding service that converts external images to data URLs
 * 3. A CDN that can proxy images with proper CORS headers
 */
const handleProfilePicUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    // For a real implementation, you would use one of these approaches:
    
    // Approach 1: Server proxy (pseudo-code for illustration)
    // return `https://your-backend.com/image-proxy?url=${encodeURIComponent(url)}`;
    
    // Approach 2: For demo purposes only, we're using a placeholder image
    // In production, DO NOT use placeholder images for real user data
    // Instead implement a proper server-side proxy
    
    // Different placeholder images based on hash of URL for consistent user images
    const hashCode = Array.from(url).reduce(
      (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
    );
    
    // Use different placeholder images to simulate different user profiles
    const placeholders = [
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9'
    ];
    
    return placeholders[Math.abs(hashCode % placeholders.length)];
    
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
