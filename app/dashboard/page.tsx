import { auth } from "@/auth";
import { sql } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export type DashboardUser = {
  id: string;
  username: string;
  name?: string;
  email?: string;
  acceptingMessages: boolean; 
};

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) return <p className="text-center mt-20">Not logged in</p>;

  // fetch fresh accepting_messages from DB
  const [row] = await sql`
    SELECT accepting_messages FROM users WHERE id = ${session.user.id}
  `;

  const user: DashboardUser = {
    id: session.user.id ?? "",
    username: session.user.username ?? "",
    name: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    acceptingMessages: row?.accepting_messages ?? true,
  };

  return <DashboardClient user={user} />;
};

export default Dashboard;
