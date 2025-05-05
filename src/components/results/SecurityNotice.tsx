
const SecurityNotice = () => {
  return (
    <div className="bg-secondary/10 border border-secondary/30 p-3 rounded w-full">
      <p className="text-xs text-muted-foreground">
        <span className="text-primary font-bold">IMPORTANT:</span> This 
        password was generated through advanced security algorithms. 
        Always use strong passwords and enable two-factor authentication 
        for maximum security.
      </p>
    </div>
  );
};

export default SecurityNotice;
