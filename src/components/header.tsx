
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  User,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getCurrentUser, isAuthenticated, logout } from "@/lib/auth";
import { toast } from "sonner";
import { mockNotifications } from "@/types";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const user = getCurrentUser();

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate unread notifications
  useEffect(() => {
    setUnreadNotifications(
      mockNotifications.filter((n) => !n.isRead).length
    );
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/");
  };

  const mainNavLinks = [
    { 
      href: "/", 
      label: "Home", 
      icon: <Home className="h-4 w-4 mr-2" /> 
    },
    { 
      href: "/dashboard", 
      label: "Dashboard", 
      icon: <PieChart className="h-4 w-4 mr-2" />,
      requiresAuth: true 
    },
    { 
      href: "/new-complaint", 
      label: "Submit Complaint", 
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      requiresAuth: true 
    },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold text-xl"
          aria-label="Harmony"
        >
          <div className="w-8 h-8 bg-primary/10 text-primary rounded-md flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="tracking-tight">Harmony</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {mainNavLinks.map((link) => 
            (!link.requiresAuth || isAuthenticated()) && (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors",
                  isActiveLink(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Auth and Profile Buttons */}
        <div className="flex items-center space-x-2">
          {isAuthenticated() ? (
            <>
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center bg-primary text-white"
                        variant="default"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm">
                      Mark all as read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mockNotifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start py-2 px-4 cursor-pointer",
                        !notification.isRead && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start justify-between w-full">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="pl-2 pr-3 py-1.5 h-auto"
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <PieChart className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-complaints")}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Complaints</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-sm"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="text-sm"
              >
                Register
              </Button>
            </>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md">
          <div className="container py-4 space-y-1">
            {mainNavLinks.map((link) => 
              (!link.requiresAuth || isAuthenticated()) && (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium",
                    isActiveLink(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {link.icon}
                    {link.label}
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
