"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

interface MessagesListProps {
  messages: Message[];
  onMessageDeleted?: (id: string) => void; // callback to remove from state
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

export default function MessagesList({ messages, onMessageDeleted }: MessagesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/messages/${id}/delete`);
      if (res.data.success) {
        toast.success("Message deleted successfully");
        if (onMessageDeleted) onMessageDeleted(id);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to delete message");
    } finally {
      setDeletingId(null);
      setLoading(false);
    }
  };

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

            <AlertDialog
              open={deletingId === msg.id}
              onOpenChange={open => setDeletingId(open ? msg.id : null)}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this message? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(msg.id)}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
