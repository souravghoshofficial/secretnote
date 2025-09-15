"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

interface MessagesListProps {
  messages: Message[];
}

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

export default function MessagesList({ messages }: MessagesListProps) {
  if (messages.length === 0) return <p className="text-muted-foreground">No messages yet.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {messages.map(msg => (
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
