'use client';

import { UserInfo, getUserInfo, setUserInfo } from '@/actions/useUserInfo';
import prisma from '@/lib/prisma/prisma';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserInfo = (key: string) => {
  const queryClient = useQueryClient();
  const queryKey = [key];

  const { data, isPending } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      // 以下のどちらでも動作しますが、Server ActionsによるGETリクエストは想定されていないため予期せぬ挙動が発生する可能性がある
      //  prismaの利用することを推奨します
      // return await prisma.user.findMany();
      return await getUserInfo();
    },
  });

  console.log('useUserInfo data', data);
  console.log('useUserInfo isPending', isPending);

  const mutation = useMutation({
    mutationFn: setUserInfo,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

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
    onSuccess: (result, _, context) => {
      queryClient.setQueryData(queryKey, (old: UserInfo[]) =>
        old.map((userInfo) => (userInfo.name === context?.optimisticUserInfo.name ? result : userInfo))
      );
      console.log('success');
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

  return {
    userInfo: data,
    isPending,
    mutation,
  };
};
