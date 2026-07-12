
import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;

  try {
    const client = await clientPromise;
    const db = client.db("mockForge");

    const res = await db.collection("endpoints").find({email}).toArray();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
