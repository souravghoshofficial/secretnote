"use client";

import { useState } from "react";
import CopyButton from "@/components/copy-button";
import MessagesList from "@/components/messages-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";
import { RefreshCw } from "lucide-react";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

interface DashboardClientProps {
  user: {
    id: string;
    username: string;
    name?: string;
    acceptingMessages: boolean;
  };
  messages: Message[];
}

const DashboardClient = ({ user, messages }: DashboardClientProps) => {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/u/${user.username}`;

  const [accepting, setAccepting] = useState(user.acceptingMessages);
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    const prev = accepting;
    setAccepting(checked);
    try {
      const res = await axios.post("/api/toggle-accepting", {
        accepting: checked,
      });
      setAccepting(res.data.accepting);
      toast.success("Message acceptance status updated successfully");
    } catch (err) {
      toast.error("Failed to update message acceptance status");
      setAccepting(prev);
    }
  };

  const handleMessageDeleted = (id: string) => {
    setMessageList((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Message[]>("/api/messages");
      setMessageList(res.data);
      toast.success("Messages refreshed");
    } catch (err) {
      toast.error("Failed to refresh messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col items-center pt-30 md:pt-24 pb-16 px-2 bg-background text-foreground hide-scrollbar">
      <div className="w-[95%] max-w-5xl">
        <h1 className="w-full max-w-5xl text-3xl md:text-4xl font-bold mb-6 text-left">
          Welcome, {user.name || user.username}
        </h1>

        {/* Share link */}
        <div className="w-full flex flex-col gap-2 mb-8">
          <Label htmlFor="link" className="text-lg font-medium">
            Copy Your Unique Link
          </Label>
          <div className="flex items-center gap-2">
            <input
              id="link"
              type="text"
              value={link}
              readOnly
              disabled
              className="flex-1 px-2 md:px-4 py-2 rounded-md bg-gray-50 dark:bg-neutral-900"
            />
            <CopyButton text={link} />
          </div>
        </div>

        {/* Accepting toggle */}
        <div className="flex items-center gap-3 mb-6">
          <Label htmlFor="accept" className="cursor-pointer text-lg">
            Accept Messages
          </Label>
          <Switch
            id="accept"
            className="cursor-pointer"
            checked={accepting}
            onCheckedChange={handleToggle}
          />
        </div>

        <Separator className="my-4 w-full" />

        {/* Messages with Refresh */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Your Messages
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={loading}
              className="cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
          <MessagesList
            messages={messageList}
            onMessageDeleted={handleMessageDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
