import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerificationSent from "./pages/VerificationSent";
import VerifyEmail from "./pages/VerifyEmail";
import ComplaintForm from "./pages/citizen/ComplaintForm";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import SuperAdminDashboard from "./components/role-views/super-admin-dashboard";
import UserDashboard from "./components/role-views/user-dashboard";
import SecretaryDashboard from "./components/role-views/secretary-dashboard";
import VillageHeadDashboard from "./components/role-views/village-head-dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verification-sent" element={<VerificationSent />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Role-based protected routes */}
            <Route 
              path="/complaint/new" 
              element={
                <RoleBasedRoute 
                  element={<ComplaintForm />} 
                  allowedRoles={['citizen', 'super_admin']} 
                />
              } 
            />
            
            {/* Dashboard routes */}
            <Route 
              path="/dashboard/citizen" 
              element={
                <RoleBasedRoute 
                  element={<UserDashboard />} 
                  allowedRoles={['citizen', 'super_admin']} 
                />
              } 
            />
            
            <Route 
              path="/dashboard/secretary" 
              element={
                <RoleBasedRoute 
                  element={<SecretaryDashboard />} 
                  allowedRoles={['secretary', 'super_admin']} 
                />
              } 
            />
            
            <Route 
              path="/dashboard/village-head" 
              element={
                <RoleBasedRoute 
                  element={<VillageHeadDashboard />} 
                  allowedRoles={['village_head', 'super_admin']} 
                />
              } 
            />
            
            <Route 
              path="/dashboard/super-admin" 
              element={
                <RoleBasedRoute 
                  element={<SuperAdminDashboard />} 
                  allowedRoles="super_admin" 
                />
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
