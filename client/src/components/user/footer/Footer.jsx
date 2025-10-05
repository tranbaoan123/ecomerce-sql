import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} TECHPC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
