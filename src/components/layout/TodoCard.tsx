// /src/components/TodoCard.tsx

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TodosProps } from "@/types/todos";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface TodoCardProps {
  todo: TodosProps;
  setCheck: ({ id }: { id: number }) => void;
  deleteTodo: ({ id }: { id: number }) => void;
  editTodo: ({ title, description, id, isDone }: TodosProps) => void;
}

export default function TodoCard({ todo, setCheck, deleteTodo, editTodo }: TodoCardProps) {
  const [editValue, setEditValue] = useState<TodosProps | null>(null);

  return (
    <Card
      className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 flex items-center space-x-4 transition-transform hover:scale-[1.01] cursor-pointer"
      key={todo.id}
    >
      <Checkbox
        id={todo.id.toString()}
        className="flex-shrink-0"
        onClick={() => setCheck({ id: todo.id })}
      />
      <div className="flex-1">
        {todo.isDone ? (
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-through">
            {todo.title}
          </h3>
        ) : (
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {todo.title}
          </h3>
        )}
        {todo.isDone ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm line-through">
            {todo.description}
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {todo.description}
          </p>
        )}
      </div>
      <div className="">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <TrashIcon
                  className="w-5 h-5 text-red-700"
                  onClick={() => deleteTodo({ id: todo.id })}
                />
                <span className="sr-only">Delete task</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <pre>Delete item</pre>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <PenSquareIcon className="w-5 h-5" />
                    <span className="sr-only">Edit task</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Edit your todo</h4>
                      <pre className="text-sm text-muted-foreground">Set the new props.</pre>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Title</Label>
                        <Input
                          id="Title"
                          defaultValue={todo.title}
                          className="col-span-2 h-8"
                          onChange={(e) =>
                            setEditValue({
                              ...todo,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Description</Label>
                        <Input
                          id="description"
                          defaultValue={todo.description}
                          className="col-span-2 h-8"
                          onChange={(e) =>
                            setEditValue({
                              ...todo,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid row-span-2">
                        <Button
                          onClick={() => {
                            if (editValue) {
                              editTodo({
                                ...editValue,
                                id: todo.id,
                                isDone: todo.isDone,
                              });
                            }
                          }}
                        >
                          Make edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <pre>Edit item</pre>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
}
