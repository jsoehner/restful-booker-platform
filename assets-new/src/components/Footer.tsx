import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  // Get the version from package.json
  const version = "1.7.0"; // Hardcoded for now, but you could import from package.json
    
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <p className="text-muted">
          restful-booker-platform v{version} Created by <a href="http://www.mwtestconsultancy.co.uk">Mark Winteringham</a> - &copy; 2019-24 <Link href="/cookie">Cookie-Policy</Link> - <Link href="/privacy">Privacy-Policy</Link> - <Link href="/admin">Admin panel</Link> <span style={{float: "right"}}></span>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 