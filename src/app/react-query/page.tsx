import Link from 'next/link';
import React from 'react';
import { ReactQueryTestWrapper } from '../components/ReactQueryTestWrapper';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/react-query/getQueryClient';
import prisma from '@/lib/prisma/prisma';
import { getUserInfo } from '@/actions/useUserInfo';

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
      <div>
        <ReactQueryTestWrapper />
        <div></div>
        <Link href={'/'}>go to top</Link>
      </div>
    </HydrationBoundary>
  );
}
