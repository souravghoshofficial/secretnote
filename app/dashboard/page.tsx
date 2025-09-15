import { auth } from "@/auth";
import { sql } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export const revalidate = 0; // optional, prevent caching

export const dynamic = "force-dynamic"; // optional, force server rendering

const Dashboard = async () => {
  'use server'; // ensures this runs on the server

  const session = await auth();
  if (!session?.user) return <p className="text-center mt-20">Not logged in</p>;

  const [row] = await sql`
    SELECT accepting_messages FROM users WHERE id = ${session.user.id}
  `;

  const user = {
    id: session.user.id ?? "",
    username: session.user.username ?? "",
    name: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    acceptingMessages: row?.accepting_messages ?? true,
  };

  return <DashboardClient user={user} />;
};

export default Dashboard;
