import { SetUserInfo, UserInfo, getUserInfo, setUserInfo } from '@/actions/useUserInfo';
import prisma from '@/lib/prisma/prisma';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserInfo = (initialQueryKey: [string]) => {
  const queryClient = useQueryClient();
  const queryKey = initialQueryKey ?? ['userInfo'];

  const { data, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const user = await prisma.user.findMany();
      return user;
    },
    // queryFn: async () => {
    //   return await getUserInfo();
    // },
    // initialData: queryClient.getQueryData(queryKey) as UserInfo[],
  });

  console.log('data', data);
  console.log('isPending', isPending);

  const mutation = useMutation({
    mutationFn: setUserInfo,
    onMutate: (variables) => {
      queryClient.cancelQueries({ queryKey });

      const optimisticUserInfo = {
        id: crypto.randomUUID(),
        name: variables.name,
        email: variables.email,
        emailVerified: variables.emailVerified,
        image: '',
      };

      queryClient.setQueryData(queryKey, (old: UserInfo[]) => [...old, optimisticUserInfo]);

      return { optimisticUserInfo };
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(queryKey, (old: UserInfo[]) =>
        old.map((userInfo) => (userInfo.name === context?.optimisticUserInfo.name ? result : userInfo))
      );
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, (old: UserInfo[]) =>
        old.filter((userInfo) => userInfo.name !== context?.optimisticUserInfo.name)
      );
      console.log(error);
    },
    onSettled: () => {
      console.log('settled');
    },
    retry: 3,
  });

  return { userInfo: data, isPending, mutation };
};
