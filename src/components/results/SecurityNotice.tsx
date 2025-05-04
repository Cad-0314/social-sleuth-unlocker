
const SecurityNotice = () => {
  return (
    <div className="bg-secondary/10 border border-secondary/30 p-3 rounded w-full">
      <p className="text-xs text-muted-foreground">
        <span className="text-primary font-bold">IMPORTANT:</span> This 
        password was generated for demonstration purposes only. No actual 
        Instagram accounts were accessed. Using this tool to attempt to access 
        someone's account without permission is illegal.
      </p>
    </div>
  );
};

export default SecurityNotice;
