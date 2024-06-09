"use server";
import {
  readOwnTasksTasksGet,
  deleteTaskTasksTaskIdDelete,
  updateTaskTasksTaskIdPut,
} from "@/client";
import { redirect } from "next/navigation";

export const getCurrentUserItems = async () => {
  try {
    const items = await readOwnTasksTasksGet();
    return items;
  } catch (error: any) {
    console.error(error);
    redirect("/login");
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await deleteTaskTasksTaskIdDelete({ taskId });
  } catch (error: any) {
    console.error(error);
    if (error.body) {
      console.error(error.body.detail);
      return {
        error: error.body.detail,
      };
    } else {
      console.error("No response from the server");
      return {
        error: "No response from the server",
      };
    }
  }
};

export const updateTask = async (
  taskId: string,
  data: { title: string; description: string; dueDate?: string }
) => {
  try {
    console.log(data)
    await updateTaskTasksTaskIdPut({ taskId, requestBody: {
      title: data.title,
      description: data.description,
      due_date: data.dueDate,
    } });
  } catch (error: any) {
    console.error(error);
    if (error.body) {
      console.error(error.body.detail);
      return {
        error: error.body.detail,
      };
    } else {
      console.error("No response from the server");
      return {
        error: "No response from the server",
      };
    }
  }
};
