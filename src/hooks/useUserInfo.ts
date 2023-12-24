import { getUserInfo } from "@/actions/useUserInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserInfo = () => {
  const queryClient = useQueryClient();
  const queryKey = ["userInfo"];

  const { data, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getUserInfo();
    },
  });

  return { userInfo: data, isPending };
};
