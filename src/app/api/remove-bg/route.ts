import { NextResponse } from 'next/server';
import { transparentBackground } from 'transparent-background';

export async function POST(req: Request) {
  const data = await req.formData();
  const image = data.get('image') as any;

  if (!image) {
    return NextResponse.json({ message: 'No image uploaded' }, { status: 400 });
  }

  try {
    const imageBuffer = await image.stream().arrayBuffer();
    
    // Remove the background using the transparent-background package
    const outputBuffer = await transparentBackground(imageBuffer, 'png', {
      fast: false, // You can change this to true for faster processing
    });

    return new Response(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to remove background' }, { status: 500 });
  }
}
