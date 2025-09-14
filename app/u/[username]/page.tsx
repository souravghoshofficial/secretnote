import SendMessagePage from "./SendMessagePage";

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params; 
  return <SendMessagePage username={username} />;
}
