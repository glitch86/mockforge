import { auth } from "@clerk/nextjs/server";

export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }
  return userId;
}
