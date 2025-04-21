'use client' 

import { startTransition, useOptimistic } from  'react';
import { Todo } from "@prisma/client";
import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { toggleTodo } from '../actions/todo-actions';

interface Props{
  todo: Todo
  // TODO: Acciones que quiero llamar
  toggleTodo: (id:string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

 const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
  todo,
  (state, newCompletValue: boolean) => ({ ...state, complete: newCompletValue }),
);

const onToggleTodo = async () => {
    try {
      startTransition( () => toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
      console.log('todoOptimistic', todoOptimistic);
    } catch (error) {
      startTransition( () => toggleTodoOptimistic(!todoOptimistic.complete));
    }
}

  return (
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div 
            // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
            onClick={ onToggleTodo }
            className={`
                flex p-1 rounded-md cursor-pointer
                hover:bg-opacity-60
                ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}
                `}>
                {
                    todoOptimistic.complete 
                    ? <IoCheckboxOutline size={30} /> 
                    : <IoSquareOutline size={30} />
                }
            </div>
                <div className="text-center s:text-left">
                    {todoOptimistic.description}
                </div>
        </div>
    </div>
  )
}
