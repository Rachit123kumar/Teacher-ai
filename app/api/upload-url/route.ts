import AWS from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

// ✅ Configure AWS for Cloudflare R2
const s3 = new AWS.S3({
  accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  endpoint: new AWS.Endpoint(process.env.JURIDISCTION_SPECIFIC_ENDPOINTS!),
  region: 'auto',
  signatureVersion: 'v4',
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  // Assert that `file` is a `File` (not just a `Blob`)
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const fileKey =
    "uploads/" + Date.now().toString() + "-" + file.name.replace(/\s+/g, "-");

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: process.env.R2_BUCKET!,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: file.type,
  };

  try {
    await s3.putObject(params).promise();

    return NextResponse.json({
      success: true,
      fileKey,
      url: `https://${process.env.R2_BUCKET}.${process.env.JURIDISCTION_SPECIFIC_ENDPOINTS}/${fileKey}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
