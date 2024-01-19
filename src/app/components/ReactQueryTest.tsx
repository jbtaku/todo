'use client';

import { useQState } from '@/hooks/useQState';
import { useUserInfo } from '@/hooks/useUserInfo';
import Link from 'next/link';

export const ReactQueryTest = () => {
  const { userInfo, isPending } = useUserInfo('test');
  const [qStateData] = useQState<string>(['qState'], 'qState test');

  return (
    <>
      <h2>
        userInfo:{isPending && 'loading...'}
        {!isPending && userInfo ? userInfo.map((user: any, index: number) => <p key={index}>{user.name}</p>) : null}
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
