import { readOwnItemsUsersMeItemsGet } from "@/client";
import { Header } from "@/components/header";
import { cookies } from "next/headers";

export default function Home() {
  console.log(cookies())
  // const items = readOwnItemsUsersMeItemsGet();
  // console.log(items);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        
      </main>
    </div>
  );
}
