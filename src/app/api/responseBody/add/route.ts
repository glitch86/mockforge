import { requireAuth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userId = await requireAuth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized request.",
        },
        {
          status: 401,
        },
      );
    }

    const responseBody = await request.json();
    const client = await clientPromise;
    const db = client.db("mockForge");
    const res = db.collection("responseBodies").insertOne({
      ...responseBody,
      email: user?.emailAddresses[0].emailAddress,
    });

    return NextResponse.json(
      {
        success: true,
        // id: (await res).insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
