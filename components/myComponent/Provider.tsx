'use client'

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
const [queryClient] = React.useState(() => new QueryClient());


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
