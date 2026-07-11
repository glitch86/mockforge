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
    const doc = await request.json();
    const client = await clientPromise;
    const db = client.db("mockForge");

    const result = await db
      .collection("endpoints")
      .insertOne({
        ...doc,
        email: user?.emailAddresses[0].emailAddress,
        ownerId: userId,
        createdAt: new Date(),
      });

    //   console.log(body)

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
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
