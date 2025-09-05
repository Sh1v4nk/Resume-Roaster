import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "Resume Roast API is running",
        timestamp: new Date().toISOString(),
    });
}
