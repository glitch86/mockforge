import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const session = await auth();

  console.log("AUTH:", session);

  return (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  );
}