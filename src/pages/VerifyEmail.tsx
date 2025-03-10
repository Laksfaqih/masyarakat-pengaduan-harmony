
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "@/lib/auth";
import { useToast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Token verifikasi tidak ditemukan');
        return;
      }

      try {
        const response = await verifyEmail(token);
        
        if (response.success) {
          setStatus('success');
          setMessage('Email Anda berhasil diverifikasi');
          
          // Auto redirect after success
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(response.message);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
        setMessage('Terjadi kesalahan saat memverifikasi email');
      }
    };

    verifyToken();
  }, [token, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto my-4 w-16 h-16 rounded-full flex items-center justify-center">
            {status === 'loading' && (
              <div className="bg-muted/20">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && 'Memverifikasi email...'}
            {status === 'success' && 'Verifikasi Berhasil!'}
            {status === 'error' && 'Verifikasi Gagal'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {message || 'Mohon tunggu sementara kami memverifikasi email Anda...'}
          </p>
          {status === 'success' && (
            <p className="text-sm mt-2">
              Anda akan dialihkan ke halaman login dalam beberapa saat...
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === 'success' && (
            <Link to="/login">
              <Button>Masuk Sekarang</Button>
            </Link>
          )}
          {status === 'error' && (
            <Link to="/register">
              <Button>Kembali ke Pendaftaran</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
