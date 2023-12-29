import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/counter");
  return NextResponse.json({ count: 0 });
}
