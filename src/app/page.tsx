import SignOutButton from '@/components/custom-ui/SignOutButton';
import Link from 'next/link';
import { getUserInfo } from '@/actions/useUserInfo';
import React from 'react';
import { ReactQueryTestWrapper } from './components/ReactQueryTestWrapper';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/react-query/getQueryClient';
import prisma from '@/lib/prisma/prisma';

export default async function Page() {
  // 以下どちらの実装でも良い
  // const queryClient = getQueryClient();
  const queryClient = new QueryClient();

  const queryKey = ['test'] as [string];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: async () => {
      // 以下のどちらでも動作しますが、Server ActionsによるGETリクエストは想定されていないため予期せぬ挙動が発生する可能性がある
      //  prismaの利用することを推奨します
      // return await prisma.user.findMany();
      return await getUserInfo();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <ReactQueryTestWrapper />
        <SignOutButton />
        <div></div>
        <Link href={'/react-query'}>go to react-query</Link>
      </div>
    </HydrationBoundary>
  );
}
