
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, MessageSquare, BarChart4 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Sistem Pengaduan Masyarakat Desa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform digital untuk melaporkan keluhan dan mengawasi tindak lanjut dari pihak desa
            secara transparan dan efektif.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-base h-12 px-8">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-base h-12 px-8">
                Masuk
              </Button>
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Ajukan Pengaduan</CardTitle>
              <CardDescription>
                Laporkan masalah yang terjadi di sekitar Anda dengan mudah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sampaikan keluhan Anda dengan detail lengkap, melampirkan bukti foto atau dokumen
                pendukung untuk ditindaklanjuti oleh perangkat desa.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Lacak Status</CardTitle>
              <CardDescription>
                Pantau perkembangan pengaduan yang telah disampaikan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Dapatkan notifikasi terbaru mengenai status pengaduan Anda, dari verifikasi awal
                hingga penyelesaian masalah.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Manajemen Pengaduan</CardTitle>
              <CardDescription>
                Sistem pengelolaan yang efisien untuk perangkat desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Verifikasi, prioritaskan, dan tindaklanjuti pengaduan masyarakat dengan sistem
                pengelolaan yang terstruktur.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart4 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Laporan & Statistik</CardTitle>
              <CardDescription>
                Analisis data pengaduan untuk pengambilan keputusan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Visualisasi data pengaduan berdasarkan kategori, prioritas, dan waktu penyelesaian
                untuk evaluasi kinerja.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-card/80 backdrop-blur-sm rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Cara Menggunakan Sistem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Buat Akun</h3>
              <p className="text-sm text-muted-foreground">
                Daftarkan diri Anda dengan identitas valid untuk mengakses sistem
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Ajukan Pengaduan</h3>
              <p className="text-sm text-muted-foreground">
                Isi formulir pengaduan dengan detail masalah dan lampirkan bukti pendukung
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Pantau Status</h3>
              <p className="text-sm text-muted-foreground">
                Dapatkan notifikasi pembaruan status dan tanggapan dari pihak desa
              </p>
            </div>
          </div>
        </section>

        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Siap Melaporkan Masalah?</h2>
          <p className="text-muted-foreground mb-6">
            Bergabunglah dengan sistem pengaduan masyarakat untuk membantu membangun desa yang lebih
            baik.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-base h-12 px-8">
              Mulai Sekarang
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Index;
