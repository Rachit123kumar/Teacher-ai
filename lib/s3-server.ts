import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

export async function downloadFromS3(fileKey: string) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint(process.env.NEXT_PUBLIC_JURIDISCTION_SPECIFIC_ENDPOINTS!),
    region: 'auto',
    signatureVersion: 'v4',
  });

  const data = await s3.getObject({
    Bucket: process.env.NEXT_PUBLIC_R2_BUCKET!,
    Key: fileKey,
  }).promise();

  const tmpDir = path.join(process.cwd(), 'tmp'); // use project-root/tmp (cross-platform)

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const filePath = path.join(tmpDir, `pdf-${Date.now()}.pdf`);
  fs.writeFileSync(filePath, data.Body as Buffer);

  return filePath;
}
