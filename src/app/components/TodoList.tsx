"use client"

import React, { Suspense } from "react";
import { useTodo } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todoList } = useTodo();
  return (
    <div>
      {todoList?.map((item) => {
        return <TodoItem key={item.id} {...item} />;
      })}
    </div>
  );
}

export default TodoList;
