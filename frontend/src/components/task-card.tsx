"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/client";
import { Edit2, Trash2 } from "lucide-react";
import { deleteTask } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditTask } from "./edit-task";

export function TaskCard({ task }: { task: Task }) {
  const router = useRouter();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>
          Due Date:{" "}
          {task?.due_date ? (
            <span
              title={
                task?.due_date ? new Date(task?.due_date).toISOString() : ""
              }
            >
              {new Date(task?.due_date || "").toLocaleDateString()}
            </span>
          ) : (
            "Not specified"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* display description with new line support */}
        <p className="whitespace-pre-line">{task.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <EditTask task={task} />
        <Button
          size="icon"
          variant="outline"
          onClick={async () => {
            try {
              const res = await deleteTask(task.id);
              if (res && "error" in res) {
                throw new Error(res.error);
              }
              toast.success("Task deleted successfully");
              // refresh the page
              router.refresh();
            } catch (error) {
              console.error(error);
              toast.error("Failed to delete task");
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
