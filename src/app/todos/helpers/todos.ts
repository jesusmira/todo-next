import { Todo } from "@prisma/client";

const sleep = (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() =>{
        resolve(true);
      }, seconds * 1000);
    });
  }



 
 export const updateTodo = async(id: string, complete: boolean):Promise<Todo> => {

  //TODO: Actualizzacion optimista
  await sleep(2);
    
    const body = { complete };
    const todo = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    console.log(todo);

    return todo;


  }
 export const createTodo = async(description: string):Promise<Todo> => {
    
    const body = { description };
    const todo = await fetch(`/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    console.log(todo);

    return todo;


  }

  export const deleteComplete = async():Promise<void> => {
    
    const todo = await fetch(`/api/todos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log(todo);

  }