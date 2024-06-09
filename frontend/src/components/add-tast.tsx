"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { createTask, } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function AddTask() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add a new task
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          isLoading={isLoading}
          onSubmitHandler={async ({
            title,
            description,
            dueDate,
          }: {
            title: string;
            description: string;
            dueDate?: Date;
          }) => {
            try {
              setIsLoading(true);
              const res = await createTask({
                title,
                description,
                dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
              });
              if (res && "error" in res) {
                throw new Error(res.error);
              }

              toast.success("Task created successfully");
              router.refresh();
              setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
              console.error(error);
              toast.error("Failed to create task");
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
