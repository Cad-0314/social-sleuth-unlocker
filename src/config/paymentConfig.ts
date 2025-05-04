
/**
 * Payment configuration with UPI IDs and corresponding QR codes
 * Each UPI ID has a matching QR code image
 * For real applications, these would be replaced with actual UPI IDs and QR codes
 */

export interface PaymentDetail {
  upiId: string;
  qrCodeUrl: string;
}

export const paymentDetails: PaymentDetail[] = [
  {
    upiId: "hackerpay@upi",
    qrCodeUrl: "https://placehold.co/300x300?text=QR+Code+1"
  },
  {
    upiId: "securetech@okaxis",
    qrCodeUrl: "https://placehold.co/300x300?text=QR+Code+2"
  },
  {
    upiId: "cyberhack@ybl",
    qrCodeUrl: "https://placehold.co/300x300?text=QR+Code+3"
  },
  {
    upiId: "darkweb@paytm",
    qrCodeUrl: "https://placehold.co/300x300?text=QR+Code+4"
  },
  {
    upiId: "matrix@upi",
    qrCodeUrl: "https://placehold.co/300x300?text=QR+Code+5"
  }
];

// Flag to control transaction success/failure
// Set to true for successful transactions, false to simulate failures
export const TRANSACTION_SUCCESS = true;

/**
 * Get a consistent payment detail based on a username string
 * This ensures the same user always sees the same payment details
 * 
 * @param username The username to base the selection on
 * @returns A consistent PaymentDetail object for the given username
 */
export function getPaymentDetailForUser(username: string): PaymentDetail {
  if (!username) {
    return paymentDetails[0];
  }
  
  // Generate a hash from the username to always get the same payment details
  const hashCode = Array.from(username).reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
  );
  
  // Use the hash to select a consistent payment detail
  const index = Math.abs(hashCode % paymentDetails.length);
  return paymentDetails[index];
}
