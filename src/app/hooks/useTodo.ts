import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, postTodo } from "../actions/useTodo";

export const useTodo = () => {
  const queryKey = ["todo"];
  const queryClient = useQueryClient();
  /*const { data, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetcher<Todo[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
        next: { tags: ["test"] },
      });
    },
    staleTime: 0,
    gcTime: 0,
  }); */

  const { mutate: post } = useMutation({
    mutationKey: queryKey,
    mutationFn: postTodo,
    /* onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const prevState = queryClient.getQueryData(queryKey) as Todo[];
      queryClient.setQueryData(queryKey, (old: Todo[]) => [
        ...old,
        { content: newData.content + "アップデートしたよ" },
      ]);
      return { prevState };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.prevState);
    }, */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: del } = useMutation({
    mutationKey: queryKey,
    mutationFn: deleteTodo,
    /* onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const prevState = queryClient.getQueryData(queryKey) as Todo[];
      //queryClient.setQueryData(queryKey, (old: Todo[]) => []);
      return { prevState };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.prevState);
    }, */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { postTodo: post, deleteTodo: del };
};
