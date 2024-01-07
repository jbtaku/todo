"use client";

import { getTodo } from "../actions/useTodo";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "@prisma/client";
import ISR from "./ISR";

function TodoList() {
  //const { todoList } = useTodo();

  //デバッグ用の関数
  const debug = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
      next: { tags: ["test"] },
    });

    const data2 = await getTodo();
    console.log("fetch", data);
    console.log("force-cache", data.json());
    console.log("server actions", data2);
  };
  const { data: todo } = useQuery<Todo[]>({ queryKey: ["todo"] });
  const { data: todo2 } = useQuery<Todo[]>({ queryKey: ["todo2"] });

  return (
    <div>
      <div className="border-4 border-blue-400 p-6">
        <p className="text-4xl font-bold">todo</p>
        {todo?.map((item) => {
          return <TodoItem key={item.id} {...item} />;
        })}
      </div>
      <div className="border-4 border-red-400 p-6">
        <p className="text-4xl font-bold">todo2</p>
        {todo2?.map((item) => {
          return <TodoItem key={item.id} {...item} />;
        })}
      </div>
      <button onClick={debug}>デバッグ</button>
      <ISR/>
    </div>
  );
}

export default TodoList;
