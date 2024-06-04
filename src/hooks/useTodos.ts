// /src/hooks/useTodos.ts

import { NewTaskProps } from "@/types/task";
import { TodosProps } from "@/types/todos";
import { useState } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState<TodosProps[]>([
    {
      id: 1,
      title: "Seu primeiro todo",
      description: "Sua breve descrição aqui",
      isDone: false,
    },
  ]);

  function addTodo(newTask: NewTaskProps) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length + 1,
        title: newTask.title,
        description: newTask.description,
        isDone: false,
      },
    ]);
  }

  function setCheck({ id }: { id: number }) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function deleteTodo({ id }: { id: number }) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function editTodo({ title, description, id, isDone }: TodosProps) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  }

  return { todos, addTodo, setCheck, deleteTodo, editTodo };
}
