import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import React from "react";

export async function GET(request: Request) {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  try {
    const client = await clientPromise;
    const db = client.db("mockForge");

    const projects = await db.collection("projects").find({email}).toArray();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
