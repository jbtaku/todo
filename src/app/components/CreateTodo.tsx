"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema, inputType } from "@/types/todo";
import { useTodo, useTodo2 } from "../hooks/useTodo";

function CreateTodo() {
  const form = useForm<inputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { postTodo } = useTodo();

  const onSubmit = (data: inputType) => {
    postTodo(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>todo</FormLabel>
              <FormControl>
                <Input
                  placeholder="やること"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          作成(todo1のみinvalidateQueryする)
        </Button>
      </form>
    </Form>
  );
}

export default CreateTodo;
