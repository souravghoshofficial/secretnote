"use client";

import { useState } from "react";
import CopyButton from "@/components/copy-button";
import MessagesList from "@/components/messages-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import axios from "axios";

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

  const handleToggle = async (checked: boolean) => {
    const prev = accepting;
    setAccepting(checked);
    try {
      const res = await axios.post("/api/toggle-accepting", { accepting: checked });
      setAccepting(res.data.accepting);
      toast.success("Message acceptance status updated successfully");
    } catch (err) {
      toast.error("Failed to update message acceptance status");
      setAccepting(prev);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-20 pb-10 px-4 bg-background text-foreground">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Welcome, {user.name || user.username}
      </h1>

      <div className="w-full max-w-lg flex flex-col gap-2 mb-8">
        <Label htmlFor="link" className="text-sm font-medium">Copy Your Unique Link</Label>
        <div className="flex items-center gap-2">
          <Input id="link" type="text" value={link} readOnly disabled className="flex-1" />
          <CopyButton text={link} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Label htmlFor="accept" className="cursor-pointer">Accept Messages</Label>
        <Switch id="accept" checked={accepting} onCheckedChange={handleToggle} />
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
        <MessagesList messages={messages} />
      </div>
    </div>
  );
};

export default DashboardClient;
