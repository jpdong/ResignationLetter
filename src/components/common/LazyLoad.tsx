import React, { Suspense } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback = <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyLoad;