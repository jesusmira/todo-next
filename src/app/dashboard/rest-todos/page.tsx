import { NewTodo, TodosGrid } from "@/app/todos";
import prisma from "@/lib/prisma";

export const metadata = {
 title: 'Listado de todos ',
 description: 'SEO Title',
};

export default async function RestTodoPage() {

  const todos = await prisma.todo.findMany({ orderBy:{ description: 'asc' } });

  


  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo   />
      </div>
      <TodosGrid  todos={todos} />
    </div>
  );
} 