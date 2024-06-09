"use server";
import { readOwnTasksTasksGet, deleteTaskTasksTaskIdDelete } from "@/client";
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
