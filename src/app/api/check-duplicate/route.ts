// app/api/check-title/route.ts

import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses[0].emailAddress;
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title")?.toLocaleLowerCase();
    const type = searchParams.get("type");
    const projectID = searchParams.get("projectID");
    const route = searchParams.get("route");

    // db
    const client = await clientPromise;
    const db = client.db("mockForge");

    if (type === "project") {
      const existingProject = await db
        .collection("projects")
        .findOne({ email, title: { $regex: `^${title}$`, $options: "i" }, });

        return NextResponse.json({exits: existingProject? true : false})
    } else if (type === "endpoint") {
      const existingEndpoint = await db
        .collection("endpoints")
        .findOne({ projectID, path:route });

        return NextResponse.json({exits: existingEndpoint? true : false})
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
