'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout( () =>{
        resolve(true)
    } , seconds * 1000)});
};


export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id } });
    if (!todo) throw new Error(`No existe el todo con id ${id}`);
    
    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { complete },
    });

    revalidatePath("/dashboard/server-todos");
    return updateTodo;
}

export const addTodo = async (description: string, userId: string) => {
    try {
        
        const todo = await prisma.todo.create({ data: { description, userId: '...' } });
     
        revalidatePath("/dashboard/server-todos");
        return todo;

        
    } catch (error) {
        // return NextResponse.json({ message: error }, { status: 400 });
        return {
            message: 'Error al crear el todo',
        }
    }
}

export const deleteCompleted = async() => {

    try {
        await prisma.todo.deleteMany({ where: { complete: true } });
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        return {
            message: 'Error al borrar todos los todos completados',
        }
    }
}