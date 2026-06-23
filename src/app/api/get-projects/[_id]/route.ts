import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ _id: string }>;
};
export async function GET(request: Request, { params }: Props) {
  try {
    const { _id } = await params;
    const client = await clientPromise;
    const db = client.db("mockForge");

    const project = await db.collection("projects").findOne({_id: new ObjectId(_id)})

    return NextResponse.json(project)
  } catch (error) {}

  //   console.log(_id);
//   return NextResponse.json({ message: "hi" });
}
