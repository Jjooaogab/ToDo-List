// /src/components/TodoForm.tsx

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewTaskProps } from "@/types/task";
import { useState } from "react";

interface TodoFormProps {
  addTodo: (newTask: NewTaskProps) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [newTask, setNewTask] = useState<NewTaskProps | null>(null);

  return (
    <DialogContent>
      <DialogHeader className="font-bold border-b border-zinc-400">Type your new task</DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="title" className="flex">Your title</Label>
          <Input
            id="title"
            name="title"
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="desc">Your Description</Label>
          <Input
            id="desc"
            name="desc"
            onChange={(e) =>
              setNewTask({
                ...newTask,
                description: e.target.value,
              })
            }
          />
        </div>
        <Button
          className="col-span-full"
          onClick={() => {
            if (newTask) addTodo(newTask);
          }}
        >
          Create
        </Button>
      </div>
    </DialogContent>
  );
}
