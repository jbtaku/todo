"use client";

import { getTodo } from "../actions/useTodo";
import { useTodo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todoList } = useTodo();

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

  return (
    <div>
      {todoList?.map((item) => {
        return <TodoItem key={item.id} {...item} />;
      })}
      <button onClick={debug}>デバッグ</button>
    </div>
  );
}

export default TodoList;
