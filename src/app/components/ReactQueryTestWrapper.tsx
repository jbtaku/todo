'use client';

import { useState } from 'react';
import { ReactQueryTest } from './ReactQueryTest';
import { setUserInfo } from '@/actions/useUserInfo';
import { useUserInfo } from '@/hooks/useUserInfo';

export const ReactQueryTestWrapper = ({ initialQueryKey }: { initialQueryKey: [string] }) => {
  const { mutation } = useUserInfo(initialQueryKey);
  // const [queryKey, setQueryKey] = useState<[string]>(initialQueryKey);

  // const onClickChangeQueryKey = () => setQueryKey((prevState) => (prevState[0] === 'test' ? ['test2'] : ['test']));

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
      {/* {!mutation.isSuccess ? (
        <p>loading...</p>
      ) : (
        <> */}
      <ReactQueryTest queryKey={initialQueryKey} />
      {/* </>
      )} */}
      <div>
        <button onClick={onClickRandomCreateUser}>ユーザーランダム生成</button>
      </div>
      <div>{/* <button onClick={onClickChangeQueryKey}>Query Key 切り替え</button> */}</div>
    </>
  );
};
