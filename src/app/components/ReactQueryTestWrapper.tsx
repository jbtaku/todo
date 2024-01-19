'use client';

import { useUserInfo } from '@/hooks/useUserInfo';
import { ReactQueryTest } from './ReactQueryTest';

export const ReactQueryTestWrapper = () => {
  const { mutation } = useUserInfo('test');

  const onClickRandomCreateUser = () => {
    const uuid = crypto.randomUUID();
    const date = new Date();

    mutation.mutate({
      name: `test_wada_${uuid}`,
      email: `test_wada_${uuid}@gmail.com`,
      emailVerified: date,
    });
  };

  return (
    <>
      <ReactQueryTest />
      <div>
        <button onClick={onClickRandomCreateUser}>ユーザーランダム生成</button>
      </div>
    </>
  );
};
