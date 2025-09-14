import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UsernameForm from "./username-form";

const Setup = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.username) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <UsernameForm email={session.user.email!} />
    </div>
  );
};

export default Setup;
