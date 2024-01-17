import Link from 'next/link';
import React from 'react';
import { ReactQueryTestWrapper } from '../components/ReactQueryTestWrapper';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/react-query/getQueryClient';
import prisma from '@/lib/prisma/prisma';

export default async function Page() {
  const queryClient = getQueryClient();

  const queryKey = ['test'] as [string];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      const user = await prisma.user.findMany();
      return user;
    },
  });

  // const [count, setCount] = useQState(['count'], 1);
  // const onClick = () => {
  //   setCount((prevState) => prevState + 1);
  // };
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ReactQueryTestWrapper initialQueryKey={queryKey} />
        <div>
          {/* <p>{count}</p>
        <button onClick={onClick}>up count</button> */}
        </div>
        <Link href={'/'}>go to top</Link>
      </div>
    </HydrationBoundary>
  );
}
