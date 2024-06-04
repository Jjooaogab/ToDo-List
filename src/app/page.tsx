"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewTaskProps } from "@/types/task";
import { TodosProps } from "@/types/todos";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Filter, Mountain, PenSquareIcon, Plus, SunMoon, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [editValue, setEditValue] = useState<NewTaskProps | null>(null);
  const [newTask, setNewTask] = useState<NewTaskProps | null>(null);
  const [todos, setTodos] = useState<TodosProps[]>([
    {
      id: 1,
      title: "Seu primeiro todo",
      description: "Sua breve descricao aqui",
      isDone: false,
    },
  ]);

  function addTodo() {
    if (newTask?.title && newTask?.description) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: newTask?.title,
          description: newTask?.description,
          isDone: false,
        },
      ]);
    } else {
      alert("Dados invalidos!");
    }
  }

  function setCheck({ id }: { id: number }) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    console.log(todos);
  }

  function deleteTodo({ id }: { id: number }) {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(todos);
  }

  function editTodo({ title, description, id, isDone }: TodosProps) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  }

  // useEffect(() => {
  //   console.log(newTask);
  // }, [newTask]);

  return (
    <div className="text-black dark:text-white">
      <nav className="w-full h-16 shadow-xl flex justify-between items-center px-4 bg-zinc-200 sticky">
        <Mountain className="transition-transform hover:scale-105" />
        <pre className="sr-only">dev.jjooaogab</pre>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger className="transition-transforme hover:scale-105">
              <Plus />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="font-bold border-b border-zinc-400">
                Type your new task
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="title" className="flex">
                    Your title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    onChange={(e) =>
                      setNewTask({
                        title: e.target.value,
                        description: newTask?.description,
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
                        title: newTask?.title,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <Button className="col-span-full" onClick={() => addTodo()}>
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <SunMoon className="transition-transform hover:scale-105" />
          <Filter className="transition-transform hover:scale-105" />
        </div>
      </nav>
      <section className="mt-4 mx-4 grid grid-cols-3 gap-3">
        {todos.map((i) => (
          <Card
            className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4 flex items-center space-x-4 transition-transform hover:scale-[1.01] cursor-pointer"
            key={i.id}
          >
            <Checkbox
              id={i.id.toString()}
              className="flex-shrink-0"
              onClick={() => setCheck({ id: i.id })}
            />
            <div className="flex-1">
              {i.isDone ? (
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-through">
                  {i.title}
                </h3>
              ) : (
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {i.title}
                </h3>
              )}
              {i.isDone ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm line-through">
                  {i.description}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {i.description}
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
                        onClick={() => deleteTodo({ id: i.id })}
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
                          <span className="sr-only">Delete task</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Edit your todo
                            </h4>
                            <pre className="text-sm text-muted-foreground">
                              Set the new props.
                            </pre>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Title</Label>
                              <Input
                                id="Title"
                                defaultValue={i.title}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setEditValue({
                                    title: e.target.value,
                                    description: editValue?.title,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Description</Label>
                              <Input
                                id="description"
                                defaultValue={i.description}
                                className="col-span-2 h-8"
                                onChange={(e) =>
                                  setEditValue({
                                    title: editValue?.title,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid row-span-2">
                              <Button
                                onClick={() => {
                                  editTodo({
                                    title: editValue?.title,
                                    description: editValue?.description,
                                    id: i.id,
                                    isDone: i.isDone,
                                  });
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
        ))}
      </section>
    </div>
  );
}
