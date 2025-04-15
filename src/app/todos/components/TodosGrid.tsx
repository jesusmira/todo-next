'use client'
import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

import * as todosApi from '@/app/todos/helpers/todos';
import { useRouter } from "next/navigation";

interface Props{
  todos?: Todo[]
}
export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter();

  const toggleTodo = async(id: string, complete: boolean) => {
    const todo = await todosApi.updateTodo(id, complete);
    console.log(todo)
    router.refresh();
  }

  return (
    <div className ='grid grid-cols-1 gap-2 sm:grid-cols-3 '>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
