import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ projectID: string }>;
};
export async function GET(request: Request, { params }: Props) {
  try {
    const { projectID } = await params;


    const client = await clientPromise;
    const db = client.db("mockForge");
    const endpoints = await db
      .collection("endpoints")
      .find({projectID})
      .toArray();

    return NextResponse.json(endpoints);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
