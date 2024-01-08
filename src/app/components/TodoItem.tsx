"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTodo, useTodo2 } from "../hooks/useTodo";

type Props = Pick<Todo, "id" | "content"> & { todo: "todo" | "todo2" };

function TodoItem({ id, content, todo }: Props) {
  const { deleteTodo } = useTodo();
  const { deleteTodo2 } = useTodo2();
  const onClick = (id: string) => {
    todo === "todo" ? deleteTodo(id) : deleteTodo2(id);
  };
  return (
    <div className="flex space-x-4 my-1">
      <p>{content}</p>
      <Button onClick={() => onClick(id)}>削除</Button>
    </div>
  );
}

export default TodoItem;
