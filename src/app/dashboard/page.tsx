import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboardClient";

const ALLOWED_EMAILS = [
  "nikolaj.ivancic@gmail.com",
  "marina.ivancic@gmail.com",
  "florin.moldovan@gmail.com",
];

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";

  if (!ALLOWED_EMAILS.includes(email)) {
    redirect("/unauthorized");
  }

  return <DashboardClient />;
}
