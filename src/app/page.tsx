export const dynamic = 'force-dynamic';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ZooRadOne</h1>
        <p className="text-xl text-gray-600 mb-8">Zoo & Marine Mammal Diagnostic Imaging</p>
        <a href="/sign-in" className="bg-black text-white px-6 py-3 rounded-lg">
          Sign In
        </a>
      </div>
    </main>
  );
}