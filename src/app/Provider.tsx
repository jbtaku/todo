"use client";

import { Children } from "@/types/common";
import { SessionProvider } from "next-auth/react";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface Props extends Children {
  dehydratedState: DehydratedState[]
}

function Provider({ children, dehydratedState }: Props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <SessionProvider>{children}</SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default Provider;
