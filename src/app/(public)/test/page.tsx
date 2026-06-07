// app/test/page.tsx

import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
  const { userId, sessionId } = await auth();

  return (
    <pre>
      {JSON.stringify(
        {
          userId,
          sessionId,
        },
        null,
        2
      )}
    </pre>
  );
}