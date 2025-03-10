
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Paperclip, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const categories = [
    { value: "infrastructure", label: "Infrastruktur" },
    { value: "health", label: "Kesehatan" },
    { value: "education", label: "Pendidikan" },
    { value: "sanitation", label: "Kebersihan" },
    { value: "security", label: "Keamanan" },
    { value: "public_services", label: "Layanan Publik" },
    { value: "others", label: "Lainnya" },
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !description || !location) {
      toast({
        title: "Formulir tidak lengkap",
        description: "Mohon isi semua bidang yang diperlukan",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulasi pengiriman data
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Pengaduan Berhasil Dikirim",
        description: "Pengaduan Anda telah diterima dan akan segera diproses",
      });
      
      navigate("/dashboard/citizen");
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal mengirim pengaduan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Form Pengaduan</CardTitle>
          <CardDescription>
            Sampaikan permasalahan atau keluhan Anda dengan mengisi formulir berikut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Pengaduan</Label>
              <Input
                id="title"
                placeholder="Masukkan judul singkat pengaduan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={loading}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Pilih kategori pengaduan" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                placeholder="Masukkan lokasi terkait pengaduan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Detail Pengaduan</Label>
              <Textarea
                id="description"
                placeholder="Jelaskan secara detail permasalahan yang Anda alami..."
                className="min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachments">Lampiran</Label>
              <div className="border rounded-md p-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Paperclip className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Seret dan lepas file di sini, atau
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Pilih File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Format: JPG, PNG, PDF, DOC (Maks. 5MB)
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">File Terlampir:</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                        >
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[200px]">
                              {file.name}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFile(index)}
                            disabled={loading}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/citizen")}
            disabled={loading}
          >
            Batalkan
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="mr-2">Mengirim</span>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Kirim Pengaduan
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplaintForm;
