import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type RouteParams = Promise<{
  projectID: string;
  path: string[];
}>;

type HandlerContext = {
  params: RouteParams;
};

export async function GET(req: Request, { params }: HandlerContext) {
  return handleMock(req, params, "GET");
}

export async function POST(req: Request, { params }: HandlerContext) {
  return handleMock(req, params, "POST");
}

type HttpMethod = "GET" | "POST";

const handleMock = async (
  req: Request,
  params: RouteParams,
  method: HttpMethod,
) => {
  const { projectID, path } = await params;

  const url = `/${projectID}/${path.join("/")}`;

  const client = await clientPromise;
  const db = client.db("mockForge");

  const endpoint = await db.collection("endpoints").findOne({
    path: url,
  });

  if (!endpoint) {
    return NextResponse.json(
      {
        success: false,
        message: "Endpoint not found",
      },
      { status: 404 },
    );
  }

  if (endpoint.method !== method) {
    return NextResponse.json(
      {
        success: false,
        message: "Method not allowed",
      },
      { status: 405 },
    );
  }

  const { responseBody } = endpoint;

  return NextResponse.json(responseBody, { status: 200 });
};
