import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

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
        // upload image to cloudinary for event 

        const file = formData.get("image") as File | null;
        if (!file) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "image", folder: "dev-radar" }, (error, results) => {
                if (error) return reject(error);
                resolve(results)
            }).end(buffer);
        })

        event.image = (uploadedImage as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);
        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });

    }
    catch (e) {
        console.error("Error in POST /api/events:", e);
        return NextResponse.json({ error: "Internal Server Error", message: e instanceof Error ? e.message : 'unknown' }, { status: 500 });
    }
}


