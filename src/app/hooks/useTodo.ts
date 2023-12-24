import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { deleteTodo, postTodo } from "../actions/useTodo";

export const useTodo = () => {
  const queryKey = ["todoList"];
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey,
    queryFn: () => {
      return fetcher<Todo[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, { cache: "no-store" });
    },
  });

  const { mutate: post } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: del } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { todoList: data, isPending, postTodo: post, deleteTodo: del };
};
