export const dynamic = 'force-dynamic';
export const revalidate = 0

import { NewTodo, TodosGrid } from "@/app/todos";
import prisma from "@/lib/prisma";

export const metadata = {
 title: 'Listado de todos ',
 description: 'SEO Title',
};

export default async function ServerTodoPage() {

  const todos = await prisma.todo.findMany({ orderBy:{ description: 'asc' } });
  console.log('construido');

  


  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo   />
      </div>
      <TodosGrid  todos={todos} />
    </>
  );
} 