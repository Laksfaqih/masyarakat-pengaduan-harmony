
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast("Formulir tidak lengkap", {
        description: "Mohon isi semua bidang yang diperlukan"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Submitting login form with email:", email);
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
      toast("Terjadi kesalahan", {
        description: "Gagal terhubung dengan sistem. Silakan coba lagi."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
          <CardDescription>
            Masukkan email dan kata sandi Anda untuk mengakses sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Kata Sandi</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <h3 className="font-semibold mb-2">Demo Akun:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p><strong>Super Admin:</strong></p>
                <p>admin@example.com</p>
              </div>
              <div>
                <p><strong>Masyarakat:</strong></p>
                <p>citizen@example.com</p>
              </div>
              <div>
                <p><strong>Sekretaris:</strong></p>
                <p>secretary@example.com</p>
              </div>
              <div>
                <p><strong>Kepala Desa:</strong></p>
                <p>villagehead@example.com</p>
              </div>
            </div>
            <p className="mt-2">Password untuk semua: <strong>password123</strong></p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Belum memiliki akun?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
