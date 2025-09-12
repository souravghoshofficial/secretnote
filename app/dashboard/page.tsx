import React from "react";
import { signIn, auth } from "@/auth";
import Image from "next/image";

const Dashboard = async () => {
  const session = await auth();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <h1>{`${session?.user?.name}`}</h1>
        <h1>{`${session?.user?.email}`}</h1>
        <Image
          src={session?.user?.image || "/globe.png"}
          alt="Profile picture"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Dashboard;
