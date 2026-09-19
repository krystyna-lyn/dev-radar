import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure the database connection is established

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        }
        catch (e) {
            console.error("Error parsing form data:", e);
            return NextResponse.json({ error: "Invalid form data", message: e instanceof Error ? e.message : 'unknown' }, { status: 400 });
        }

    }
    catch (e) {
        console.error("Error in POST /api/events:", e);
        return NextResponse.json({ error: "Internal Server Error", message: e instanceof Error ? e.message : 'unknown' }, { status: 500 });
    }
}


