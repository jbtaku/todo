import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const todos = async () => {
  const data = (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
    next: { tags: ["test"] },
  }).then((res) => res.json())) as Todo[];

  return data;
};

export const useTodo = () => {
  const queryKey = ["test"];
  const { data } = useQuery({
    queryKey,
    enabled: false,
    initialData: todos()
  });

  return data;
};
