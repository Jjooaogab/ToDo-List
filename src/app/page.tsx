// /src/pages/Home.tsx

"use client";

import TodoCard from "@/components/layout/TodoCard";
import TodoNav from "@/components/layout/TodoNav";
import useTodos from "@/hooks/useTodos";

export default function Home() {
  const { todos, addTodo, setCheck, deleteTodo, editTodo } = useTodos();

  return (
    <div className="text-black dark:text-white">
      <TodoNav addTodo={addTodo} />
      <section className="mt-4 mx-4 grid grid-cols-3 gap-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            setCheck={setCheck}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </section>
    </div>
  );
}
