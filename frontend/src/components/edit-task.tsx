"use client";

import React from "react";
import { Task } from "@/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2 } from "lucide-react";
import { TaskForm } from "./task-form";
import { updateTask } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export function EditTask({ task }: { task: Task }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit the task</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={{
            title: task.title,
            description: task.description || "",
            dueDate: task.due_date ? new Date(task.due_date) : undefined,
          }}
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
              const res = await updateTask(task.id, {
                title,
                description,
                dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
              });
              if (res && "error" in res) {
                throw new Error(res.error);
              }
              toast.success("Task updated successfully");
              router.refresh();
              setIsLoading(false);
            } catch (error) {
              setIsLoading(false);
              console.error(error);
              toast.error("Failed to update task");
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
