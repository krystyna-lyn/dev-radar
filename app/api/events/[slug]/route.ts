import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

type RouteParams = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(
    _req: NextRequest,
    { params }: RouteParams
) {
    try {
        const { slug } = await params;

        // Validate the dynamic route parameter.
        if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }
        // Normalize slug before querying the database

        const normalizedSlug = slug.trim().toLowerCase();

        // Prevent excessively long or malformed slugs.
        if (normalizedSlug.length > 200) {
            return NextResponse.json(
                { error: "Invalid slug" },
                { status: 400 }
            );
        }

        await connectDB();

        const event = await Event.findOne({ slug: normalizedSlug }).lean();

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { event },
            { status: 200 }
        );

    } catch (error: unknown) {
        console.error("Error fetching event by slug:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}