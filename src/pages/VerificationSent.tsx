
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerificationSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "email Anda";

  // Redirect if someone navigates to this page directly without an email
  if (!location.state?.email) {
    setTimeout(() => navigate('/register'), 5000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto my-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verifikasi Email</CardTitle>
          <CardDescription>
            Kami telah mengirimkan email verifikasi ke
          </CardDescription>
          <p className="font-medium mt-1">{email}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Silakan periksa kotak masuk email Anda dan klik tautan verifikasi untuk mengaktifkan
            akun. Jika Anda tidak menerima email dalam beberapa menit, periksa folder spam atau klik
            tombol di bawah untuk mengirim ulang.
          </p>
          <div className="mt-4 space-y-2">
            <Button className="w-full" variant="outline">
              Kirim Ulang Verifikasi
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Sudah terverifikasi?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationSent;
