"use client";

import { useTodo } from "@/hooks/useTodo";
import { getTodo } from "../actions/useTodo";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "@prisma/client";

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
  const todoList = useTodo();
  const { data } = useQuery<Todo[]>({ queryKey: ["prefetch"] });

  return (
    <div>
      {todoList?.map((item) => {
        return <TodoItem key={item.id} {...item} />;
      })}
      <button onClick={debug}>デバッグ</button>
      <div className="border-4 border-red-400">
        <p className="text-4xl font-bold">prefetch test</p>
        {data?.map((item) => {
          return <p key={item.id}>{item.content}</p>;
        })}
      </div>
    </div>
  );
}

export default TodoList;
