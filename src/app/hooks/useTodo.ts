import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, postTodo } from "../actions/useTodo";

export const useTodo = () => {
  const queryKey = ["todoList"];
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      return fetcher<Todo[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`);
    },
    staleTime: Infinity,
  });

  const { mutate: post } = useMutation({
    mutationFn: postTodo,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const prevState = queryClient.getQueryData(queryKey) as Todo[];
      queryClient.setQueryData(queryKey, (old: Todo[]) => [
        ...old,
        { content: newData.content + "takumi" },
      ]);
      return { prevState };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.prevState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: del } = useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { todoList: data, isPending, postTodo: post, deleteTodo: del };
};
