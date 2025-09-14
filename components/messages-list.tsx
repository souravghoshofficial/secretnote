import { sql } from "@/lib/db";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


type Message = {
  id: string;
  content: string;
  created_at: string;
};

function formatIST(dateString: string) {
  const utcDate = new Date(dateString);

  return utcDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function MessagesList({ userId }: { userId: string }) {
  const rows = (await sql`
    SELECT id, content, created_at 
    FROM messages 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `) as Message[];

  if (rows.length === 0) {
    return <p className="text-muted-foreground">No messages yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rows.map((msg: Message) => (
        <Card key={msg.id} className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm md:text-base">{msg.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <span>{formatIST(msg.created_at)}</span>
            <Button variant="destructive" size="icon">
              <X className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
