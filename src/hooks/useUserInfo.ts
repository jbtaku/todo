import { getUserInfo } from '@/actions/useUserInfo';
import { useQuery } from '@tanstack/react-query';

export const useUserInfo = (queryKeyParameter: [string], initialData: any) => {
  const queryKey = queryKeyParameter ?? ['userInfo'];

  const { data, isPending } = useQuery({
    queryKey,
    // enabled: false,
    queryFn: async () => {
      return await getUserInfo();
    },
    initialData,
  });

  console.log('data', data);
  console.log('isPending', isPending);

  return { userInfo: data, isPending };
};
