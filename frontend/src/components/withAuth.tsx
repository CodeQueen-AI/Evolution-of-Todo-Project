// components/withAuth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useAuth } from '../hooks/useAuth';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/signin');
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      // You can show a loading spinner here
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
