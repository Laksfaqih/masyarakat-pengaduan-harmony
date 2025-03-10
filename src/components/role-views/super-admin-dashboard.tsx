
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from '../user-management/UserManagement';

const SuperAdminDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Super Admin</h2>
      </div>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Manajemen Pengguna</TabsTrigger>
          <TabsTrigger value="complaints">Semua Pengaduan</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan Sistem</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>
                  Kelola semua pengguna di sistem dan atur peran mereka
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="complaints" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Semua Pengaduan</CardTitle>
                <CardDescription>
                  Lihat dan kelola semua pengaduan dari masyarakat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Lihat dan kelola semua pengaduan dari masyarakat akan ditampilkan di sini.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>
                  Konfigurasi sistem dan parameter aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Pengaturan sistem akan ditampilkan di sini.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
