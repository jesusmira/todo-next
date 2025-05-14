export const dynamic = 'force-dynamic';
export const revalidate = 0


import { NewTodo, TodosGrid } from "@/app/todos";
import { getUserSessionServer } from "@/auth/auth/auth-actions";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de todos ',
 description: 'SEO Title',
};

export default async function RestTodoPage() {

  const user = await getUserSessionServer();
  
    if ( !user ) redirect('/api/auth/signin');
    
  
    const todos = await prisma.todo.findMany({ 
      where: { userId: user.id },
      orderBy:{ description: 'asc' } });

  


  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo   />
      </div>
      <TodosGrid  todos={todos} />
    </div>
  );
} 