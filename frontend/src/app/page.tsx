import { AddTask } from "@/components/add-tast";
import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { getCurrentUserItems } from "@/lib/api";
import { configureRequestWithAuth } from "@/lib/auth";

export default async function Home() {
  await configureRequestWithAuth();
  const items = await getCurrentUserItems();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* add task button on right side */}
        <div className="flex justify-end">
          <AddTask />
        </div>
        {/* nice 4 cols grid for large and 2 cols for tabs and 1 cols for mobile */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item) => (
            <TaskCard key={item.id} task={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
