"use client";

import { getTodo } from "../actions/useTodo";
import TodoItem from "./TodoItem";
import { hydrate, useQuery } from "@tanstack/react-query";
import { Todo } from "@prisma/client";
import ISR from "./ISR";
import { fetcher } from "@/utils/fetcher";
import { useTodo, useTodo2 } from "../hooks/useTodo";

function TodoList() {
  //const { todoList } = useTodo();

  //デバッグ用の関数
  const debug = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`);

    const data2 = await getTodo();
    console.log("fetch", data);
    console.log("force-cache", data.json());
    console.log("server actions", data2);
  };
  const { todo } = useTodo();
  const { todo2 } = useTodo2();

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
      <ISR />
    </div>
  );
}

export default TodoList;
