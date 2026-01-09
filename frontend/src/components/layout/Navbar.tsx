import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { signOut } from '@/services/auth';

export const Navbar = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      // In a real app, useAuth.signOut would handle clearing token and user
      // For now, redirect manually
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Todo App
        </Link>
        <div>
          {!loading && isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.name || user?.email}!</span>
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="hover:text-gray-300">
                Sign In
              </Link>
              <Link href="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
