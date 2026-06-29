import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const doc = await request.json();
    const client = await clientPromise;
    const db = client.db("mockForge");

    const result = await db.collection("endpoints").insertOne(doc);

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
