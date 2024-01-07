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
  todo: DehydratedState;
  todo2: DehydratedState;
}

function Provider({ children, todo, todo2 }: Props) {
  const queryClient = new QueryClient();
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
