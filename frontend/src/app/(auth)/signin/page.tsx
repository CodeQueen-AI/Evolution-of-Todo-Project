'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Failed to sign in');
      }

      const data = await res.json();
      auth.signIn(data.access_token, email);
      router.push('/tasks');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className={`${poppins.className} min-h-screen bg-black flex`}>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold text-white mb-10 text-center">
  Welcome Back
</h2>


          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div>
              <label className="text-white text-sm">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-white text-sm">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 text-white py-2 pr-10 focus:outline-none focus:border-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-8 text-purple-400 hover:text-purple-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Button + Signup Line */}
            <div className="flex flex-col items-center gap-6 pt-6">
              <button
                type="submit"
                className="
                  w-2/3
                  h-14
                  rounded-full
                  bg-purple-600
                  text-white
                  border
                  border-purple-600
                  font-medium
                  transition-all
                  duration-300
                  shadow-[0_0_20px_rgba(168,85,247,0.6)]
                  hover:bg-white
                  hover:text-purple-600
                  hover:border-purple-600
                  hover:shadow-[0_0_30px_rgba(168,85,247,0.9)]
                "
              >
                Log In
              </button>

              <p className="text-white text-sm">
                Don’t have an account?{' '}
                <span
                  onClick={() => router.push('/signup')}
                  className="text-purple-400 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>

          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/Img.avif"
          alt="Sign In"
          className="w-[75%] object-contain"
        />
      </div>
    </div>
  );
}
