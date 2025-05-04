
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

export async function fetchAccountDetails(username: string): Promise<ProfileData | null> {
  try {
    console.log("Fetching account details for:", username);
    
    const response = await fetch("http://localhost:5000/", {
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
    
    const data = await response.json();
    return data;
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
