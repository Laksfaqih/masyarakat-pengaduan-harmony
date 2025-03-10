
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { getCurrentUser } from '@/lib/auth';

const Unauthorized = () => {
  const user = getCurrentUser();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto my-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Akses Ditolak</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Akun Anda terdaftar sebagai 
            <span className="font-semibold"> {user?.role === 'citizen' ? 'Masyarakat' : 
              user?.role === 'secretary' ? 'Sekretaris Desa' : 
              user?.role === 'village_head' ? 'Kepala Desa' : 
              user?.role === 'super_admin' ? 'Super Admin' : 'Pengguna'}</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            Silakan kembali ke halaman yang sesuai dengan peran Anda.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link to="/">
            <Button variant="default">
              Kembali ke Beranda
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
