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
  return handleGet(req, params, "GET");
}

export async function POST(req: Request, { params }: HandlerContext) {
  return handlePost(req, params, "POST");
}

type HttpMethod = "GET" | "POST";

const handleGet = async (
  req: Request,
  params: RouteParams,
  method: HttpMethod,
) => {
  const { projectID, path } = await params;

  const url = `/${projectID}/${path.join("/")}`;

  const client = await clientPromise;
  const db = client.db("mockForge");

  const doc = await db.collection("responseBodies").findOne({
    projectID,
    path: url,
  });

  if (!doc) {
    return NextResponse.json(
      {
        success: false,
        message: "Document not found",
      },
      { status: 404 },
    );
  }

  // if (doc.method !== method) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Method not allowed",
  //     },
  //     { status: 405 },
  //   );
  // }

  const { responseBody } = doc;

  return NextResponse.json(responseBody, { status: 200 });
};


const handlePost = async(
  req: Request,
  params: RouteParams,
  method: HttpMethod,
) => {

  const {projectID, path} = await params;
  const url = `/${projectID}/${path.join("/")}`;

  const responseBody = await req.json()
  const client = await clientPromise;
  const db = client.db("mockForge");

  const doc = await db.collection("responseBodies").updateOne({projectID, path:url}, {$push: {
      responseBody: responseBody
    },})

    console.log(projectID, url, responseBody)

  return NextResponse.json(doc)
}