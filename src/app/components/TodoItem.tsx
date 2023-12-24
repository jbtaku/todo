"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTodo } from "../hooks/useTodo";

type Props = Pick<Todo, "id" | "title" | "content">;

function TodoItem({ id, title, content }: Props) {
  const { deleteTodo } = useTodo();
  return (
    <div className="flex space-x-4 my-1">
      <p>{title}</p>
      <p>{content}</p>
      <Button onClick={() => deleteTodo(id)}>削除</Button>
    </div>
  );
}

export default TodoItem;
