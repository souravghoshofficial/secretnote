import { auth } from "@/auth";
import { sql } from "@/lib/db";
import DashboardClient from "./DashboardClient";
import { decryptMessage } from "@/lib/crypto";

export const revalidate = 0;
export const dynamic = "force-dynamic";


type MessageRow = {
  id: string;
  encrypted_text: string;
  iv: string;
  auth_tag: string;
  created_at: string;
};


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
  ` as { accepting_messages: boolean }[];


  const rawRows = await sql`
    SELECT id, encrypted_text, iv, auth_tag, created_at
    FROM messages
    WHERE user_id = ${session.user.id}
    ORDER BY created_at DESC
  ` as MessageRow[];


  const messages: Message[] = rawRows.map((m) => ({
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
