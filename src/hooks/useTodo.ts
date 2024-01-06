import { Todo } from "@prisma/client";
import { useQState } from "./useQState";
import { todoList } from "@/data/todoList";

export const useTodo = () => {
  const queryKey = ["test"];
  const [todo, setTodo] = useQState<Todo[]>(queryKey);
  todoList().then((data) => setTodo(data));

  return todo;
};
