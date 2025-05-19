
const SecurityNotice = () => {
  return (
    <div className="bg-secondary/10 border border-secondary/30 p-3 rounded w-full">
      <p className="text-xs text-muted-foreground">
        <span className="text-primary font-bold">SECURITY NOTICE:</span> This 
        password was generated using advanced cryptographic algorithms. 
        For optimal security, change this password immediately after login 
        and enable two-factor authentication.
      </p>
    </div>
  );
};

export default SecurityNotice;
