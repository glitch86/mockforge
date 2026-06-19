import clientPromise from "@/lib/mongodb";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
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
      createdAt: new Date(),
    });

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
