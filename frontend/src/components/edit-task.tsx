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
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
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
              await updateTask(task.id, {
                title,
                description,
                dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
              });
              toast.success("Task updated successfully");
              router.refresh();
              setIsLoading(false);
            } catch (error) {
              console.error(error);
              toast.error("Failed to update task");
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
