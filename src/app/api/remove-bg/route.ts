import { toBuffer } from "@/utils/buffer";
import { NextResponse } from "next/server";
import { transparentBackground } from "transparent-background";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const image = data.get("image") as File;
  console.log({ image });

  if (!image) {
    return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
  }

  // Validate the file type
  const fileType = image.type;
  if (!["image/png", "image/jpeg"].includes(fileType)) {
    return NextResponse.json({ message: "Invalid file type" }, { status: 400 });
  }

  const timestamp = Date.now();
  const imagePath = `image-${timestamp}.png`;

  try {
    const imageBuffer = Buffer.from(new Uint8Array(await image.arrayBuffer()));
    console.log({ imageBuffer });

    // Save the image to a file asynchronously
    await writeFile(imagePath, imageBuffer);

    // Remove the background using the transparent-background package
    const outputBuffer = await transparentBackground(imageBuffer, "png", {
      fast: false, // You can change this to true for faster processing
    });

    // Optionally, delete the saved file after processing
    await unlink(imagePath); // Deletes the file

    return new Response(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to remove background" },
      { status: 500 }
    );
  }
}
