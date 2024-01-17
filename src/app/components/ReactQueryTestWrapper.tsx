'use client';

import { ReactQueryTest } from './ReactQueryTest';
import { useUserInfo } from '@/hooks/useUserInfo';

export const ReactQueryTestWrapper = ({ initialQueryKey }: { initialQueryKey: [string] }) => {
  const { mutation } = useUserInfo(initialQueryKey);

  const onClickRandomCreateUser = async () => {
    const uuid = crypto.randomUUID();

    mutation.mutate({
      name: `test_wada_${uuid}`,
      email: `test_wada_${uuid}@gmail.com`,
      emailVerified: new Date(),
    });
  };

  return (
    <>
      <ReactQueryTest queryKey={initialQueryKey} />
      <div>
        <button onClick={onClickRandomCreateUser}>ユーザーランダム生成</button>
      </div>
    </>
  );
};
