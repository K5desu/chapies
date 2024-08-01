import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // ⚠️ The below code is for App Router Route Handlers only
  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: "public",
    });
    return NextResponse.json(blob);
  }
  throw new Error("No file selected");
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
