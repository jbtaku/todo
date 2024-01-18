'use client';

import { Children } from '@/types/common';
import { SessionProvider } from 'next-auth/react';
import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Props extends Children {
  todo: DehydratedState;
  todo2: DehydratedState;
}

function Provider({ children, todo, todo2 }: Props) {
  // const queryClient = new QueryClient();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={todo}>
        <HydrationBoundary state={todo2}>
          <SessionProvider>{children}</SessionProvider>
        </HydrationBoundary>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default Provider;
