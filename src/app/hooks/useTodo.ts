import { fetcher } from "@/utils/fetcher";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, postTodo } from "../actions/useTodo";

export const useTodo = () => {
  const queryKey = ["todo"];
  const queryClient = useQueryClient();
  const { data } = useQuery<Todo[]>({
    queryKey,
    queryFn: async () => {
      return await fetcher<Todo[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`,
        {
          next: { tags: queryKey },
        }
      );
    },
    staleTime: Infinity
  });

  const { mutate: post } = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ["todo", "todo2"] });
    },
  });

  const { mutate: del } = useMutation({
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

  return { todo: data, postTodo: post, deleteTodo: del };
};

export const useTodo2 = () => {
  const queryKey = ["todo2"];
  const queryClient = useQueryClient();

  const { data } = useQuery<Todo[]>({
    queryKey,
    queryFn: async () => {
      return await fetcher<Todo[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo2`,
        {
          next: { tags: queryKey },
        }
      );
    },
    staleTime: Infinity
  });

  const { mutate: post } = useMutation({
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

  return { todo2: data, postTodo2: post, deleteTodo2: del };
};
