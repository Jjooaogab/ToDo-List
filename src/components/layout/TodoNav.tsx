import TodoForm from "@/components/layout/TodoForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewTaskProps } from "@/types/task";
import { PopoverContent } from "@radix-ui/react-popover";
import { Moon, MountainIcon, Sun, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Popover, PopoverTrigger } from "../ui/popover";

interface TodoNavProps {
  addTodo: (newTask: NewTaskProps) => void;
}

export default function TodoNav({ addTodo }: TodoNavProps) {
  const { setTheme } = useTheme();

  return (
    <Dialog>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 shadow-md">
        <a href="#">
          <MountainIcon className="transition-all hover:scale-105 cursor-pointer" />
        </a>
        <h1 className="text-xl font-bold sr-only">Todo App</h1>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <SunMoonIcon className="transition-all hover:scale-105 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2 bg-zinc-800 p-4 rounded-lg">
                <Button className="rounded-full h-12 w-12" onClick={() => setTheme('dark')}>
                  <Moon />
                </Button>
                <Button className="rounded-full h-12 w-12" onClick={() => setTheme('light')} >
                  <Sun />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <DialogTrigger>
            <Button variant="default">Create new task</Button>
          </DialogTrigger>
        </div>
      </div>
      <TodoForm addTodo={addTodo} />
    </Dialog>
  );
}
