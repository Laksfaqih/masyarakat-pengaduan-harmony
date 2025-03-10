
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

export function useAuthRedirect(allowedRoles?: string[]) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
      navigate('/unauthorized');
    }
  }, [user, profile, loading, navigate, allowedRoles]);

  return { user, profile, loading };
}
