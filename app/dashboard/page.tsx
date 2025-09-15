// app/dashboard/page.tsx
import { auth } from "@/auth";
import { sql } from "@/lib/db";
import DashboardClient from "./DashboardClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Message = {
  id: string;
  content: string;
  created_at: string;
};

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) return <p className="text-center mt-20">Not logged in</p>;

  const [userRow] = await sql`
    SELECT accepting_messages FROM users WHERE id = ${session.user.id}
  `;

  const messages = (await sql`
    SELECT id, content, created_at
    FROM messages
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  `) as Message[];

  const user = {
    id: session.user.id ?? "",
    username: session.user.username ?? "",
    name: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    acceptingMessages: userRow?.accepting_messages ?? true,
  };

  return <DashboardClient user={user} messages={messages} />;
};

export default Dashboard;
