
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex items-center space-x-2 font-bold text-xl mb-4"
              aria-label="Harmony"
            >
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-md flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span>Harmony</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Connecting citizens and village administration for effective
              complaint resolution and community improvement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/new-complaint" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Submit Complaint
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@harmony.village.id</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+62 123 4567 890</span>
              </li>
              <li className="flex items-center space-x-3 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Harmony. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
