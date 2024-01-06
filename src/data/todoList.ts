import { Todo } from "@prisma/client";

export const todoList = async () => {
    const data = (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, {
      next: { tags: ["test"] },
    }).then((res) => res.json())) as Todo[];
  
    return data;
  };