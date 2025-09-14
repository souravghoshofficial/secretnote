import { auth } from "@/auth";
import CopyButton from "@/components/copy-button";
import MessagesList from "@/components/messages-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) return <p className="text-center mt-20">Not logged in</p>;

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/u/${user.username}`;

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-20 pb-10 px-4 bg-background text-foreground">
      {/* Welcome */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Welcome, {user.name || user.username}
      </h1>

      {/* Share link */}
      <div className="w-full max-w-lg flex flex-col gap-2 mb-8">
        <Label htmlFor="link" className="text-sm font-medium">
          Copy Your Unique Link
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="link"
            type="text"
            value={link}
            readOnly
            disabled
            className="flex-1"
          />
          <CopyButton text={link} />
        </div>
      </div>

      {/* Accept Messages toggle */}
      <div className="flex items-center gap-2 mb-6">
        <Switch id="accept" defaultChecked />
        <Label htmlFor="accept" className="cursor-pointer">
          Accept Messages
        </Label>
      </div>

      {/* Messages */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
        <MessagesList userId={user.id!} />
      </div>
    </div>
  );
};

export default Dashboard;
