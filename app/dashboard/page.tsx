import { auth } from "@/auth";
import { sql } from "@/lib/db";
import DashboardClient from "./DashboardClient";
import { decryptMessage } from "@/lib/crypto";

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

  const rows: any[] = await sql`
    SELECT id, encrypted_text, iv, auth_tag, created_at
    FROM messages
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  `;

  const messages: Message[] = rows.map((m) => ({
    id: m.id,
    content: decryptMessage(m.encrypted_text, m.iv, m.auth_tag),
    created_at: m.created_at,
  }));

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
