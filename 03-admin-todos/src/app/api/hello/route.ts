import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello from the API!" });
}
export async function POST(request: Request) {
  return NextResponse.json({ message: "Hello from the API!", method: "POST" });
}
