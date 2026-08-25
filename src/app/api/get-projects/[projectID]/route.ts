import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ projectID: string }>;
};
export async function GET(request: Request, { params }: Props) {
  try {
    const { projectID } = await params;
    const client = await clientPromise;
    const db = client.db("mockForge");

    // console.log("projectid", projectID)
    const project = await db.collection("projects").findOne({ projectID });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(error);
  }

  //   console.log(_id);
  //   return NextResponse.json({ message: "hi" });
}
