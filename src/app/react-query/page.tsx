import { getUserInfo } from '@/actions/useUserInfo';
import Link from 'next/link';
import React from 'react';
import { ReactQueryTestWrapper } from '../components/ReactQueryTestWrapper';

export default async function Page() {
  const initialUserInfo = await getUserInfo();

  // const [count, setCount] = useQState(['count'], 1);
  // const onClick = () => {
  //   setCount((prevState) => prevState + 1);
  // };
  return (
    <div>
      <ReactQueryTestWrapper initialData={initialUserInfo} />
      <div>
        {/* <p>{count}</p>
        <button onClick={onClick}>up count</button> */}
      </div>
      <Link href={'/'}>go to top</Link>
    </div>
  );
}

// export default Page;
