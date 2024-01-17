'use client';

import { useQState } from '@/hooks/useQState';
import { useUserInfo } from '@/hooks/useUserInfo';
import Link from 'next/link';

export const ReactQueryTest = ({ queryKey }: { queryKey: [string] }) => {
  const { userInfo, mutation } = useUserInfo(queryKey);
  const [qStateData] = useQState<string>(['qState'], 'qState test');

  // console.log('userInfo after mutate', userInfo);
  // console.log('isPending in client component', isPending);
  // console.log('qStateData in client component', qStateData);

  return (
    <>
      <h2>
        userInfo:{mutation.isPending && 'loading...'}
        {!mutation.isPending && userInfo
          ? userInfo.map((user: any, index: number) => <p key={index}>{user.name}</p>)
          : null}
      </h2>
      <h2>qStateData:{qStateData}</h2>
      <div>
        <Link href="/">/に遷移する</Link>
      </div>
      <div>
        <Link href="/react-query">/react-queryに遷移する</Link>
      </div>
    </>
  );
};
