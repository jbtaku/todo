import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const todos = async () => {
  const data = (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
    next: { tags: ["test"] },
  }).then((res) => res.json())) as Todo[];

  return data;
};

export const useTodo = () => {
  const queryKey = ["test"];
  const [todo, setTodo] = useState<Todo[]>()
  todos().then((data) => setTodo(data))
  const { data } = useQuery({
    queryKey,
    enabled: false,
    initialData: todo
  });

  return data;
};
