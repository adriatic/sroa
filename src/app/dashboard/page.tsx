import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data, error } = await supabase.from("_test").select("*").limit(1);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">SROA Dashboard</h1>
      <p className="ml-4 text-gray-500">
        Supabase: {error ? "connected (no tables yet)" : "connected"}
      </p>
    </main>
  );
}