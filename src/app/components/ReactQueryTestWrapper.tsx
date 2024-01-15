'use client';

import { useState } from 'react';
import { ReactQueryTest } from './ReactQueryTest';
import { setUserInfo } from '@/actions/useUserInfo';

export const ReactQueryTestWrapper = ({ initialData }: { initialData: any }) => {
  const [queryKey, setQueryKey] = useState<[string]>(['test']);

  const onClickChangeQueryKey = () => setQueryKey((prevState) => (prevState[0] === 'test' ? ['test2'] : ['test']));

  const onClickRandomCreateUser = async () => {
    await setUserInfo();
  };

  return (
    <>
      <ReactQueryTest queryKey={queryKey} initialData={initialData} />
      <div>
        <button onClick={onClickRandomCreateUser}>ユーザーランダム生成</button>
      </div>
      <div>
        <button onClick={onClickChangeQueryKey}>Query Key 切り替え</button>
      </div>
    </>
  );
};
