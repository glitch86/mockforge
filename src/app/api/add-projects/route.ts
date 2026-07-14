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
    const body = await request.json();
    const { title, description, projectID } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Project title is required." },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("mockForge");

    const result = await db.collection("projects").insertOne({
      title,
      description,
      projectID,
      endpoints: 0,
      response: 0,
      ownerId: userId,
      email: user?.emailAddresses[0].emailAddress,
      createdAt: new Date(),
      lastUpdated: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
        projectID,
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
