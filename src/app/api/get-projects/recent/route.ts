import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const ids = request.nextUrl.searchParams.getAll("ids");
    const client = await clientPromise;
    const db = client.db("mockForge");

    // console.log(ids, "id")

    const projects = await db
      .collection("projects")
      .find({ projectID: { $in: ids } })
      .toArray();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
