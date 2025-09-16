"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
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
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await axios.delete(`/api/messages/${id}/delete`);
      if (res.data.success) {
        toast.success("Message deleted successfully");
        if (onMessageDeleted) onMessageDeleted(id);
      }
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to delete message");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to delete message");
      }
    } finally {
      setDeletingId(null);
      setLoadingId(null);
    }
  };

  if (messages.length === 0) return <p className="text-muted-foreground">No messages yet.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {messages.map((msg) => (
        <Card key={msg.id} className="shadow-none rounded-md">
         <CardHeader className="flex justify-between">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            {msg.content}
          </CardTitle>
            <AlertDialog
              open={deletingId === msg.id}
              onOpenChange={(open: boolean) => setDeletingId(open ? msg.id : null)}
            >
              <AlertDialogTrigger asChild>
                <Button className="cursor-pointer bg-red-500 hover:bg-red-600 text-white" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-left">Delete Message</AlertDialogTitle>
                  <AlertDialogDescription className="text-left">
                    Are you sure you want to delete this message? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2 mt-1">
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(msg.id)}
                    disabled={loadingId === msg.id}
                    className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                  >
                    {loadingId === msg.id ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
         </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            <span>{formatIST(msg.created_at)}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
