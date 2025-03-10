
import React, { useEffect, useState } from 'react';
import { getAllUsers, changeUserRole } from '@/lib/auth';
import { User, UserRole } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [changingRole, setChangingRole] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch users. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setChangingRole(prev => ({ ...prev, [userId]: true }));
    
    try {
      const response = await changeUserRole(userId, newRole);
      
      if (response.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
        
        toast({
          title: 'Success',
          description: `User role updated to ${newRole}`,
        });
      } else {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error changing role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setChangingRole(prev => ({ ...prev, [userId]: false }));
    }
  };

  const getRoleLabel = (role: UserRole): string => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'village_head': return 'Kepala Desa';
      case 'secretary': return 'Sekretaris Desa';
      case 'citizen': return 'Masyarakat';
      default: return role;
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Daftar Pengguna</h3>
        <Button size="sm">+ Tambah Pengguna</Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pengguna</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.verified ? 'Terverifikasi' : 'Belum Verifikasi'}
                  </span>
                </TableCell>
                <TableCell>
                  <Select 
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                    disabled={changingRole[user.id]}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        {changingRole[user.id] ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </div>
                        ) : (
                          getRoleLabel(user.role)
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="citizen">Masyarakat</SelectItem>
                        <SelectItem value="secretary">Sekretaris Desa</SelectItem>
                        <SelectItem value="village_head">Kepala Desa</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
