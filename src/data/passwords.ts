
// Custom passwords that you can edit and manage
export const customPasswords = [
  "MyCustomPass123!",
  "SecureLogin2024#",
  "UserAccount456$",
  "PrivateAccess789&",
  "PersonalCode321*",
  "CustomEntry555@",
  "SelectedPass999+",
  "ChosenLogin147%",
  "PreferredPass258^",
  "DesignatedCode369!"
];

// Function to get a password based on username
export const getCustomPassword = (username: string): string => {
  if (!username) return customPasswords[0];
  
  // Use username to consistently select the same password for the same user
  const hashCode = Array.from(username).reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
  );
  const index = Math.abs(hashCode % customPasswords.length);
  return customPasswords[index];
};
