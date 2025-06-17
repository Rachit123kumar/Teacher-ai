// app/api/create-chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { downloadFromS3 } from '@/lib/s3-server';
import { loadS3IntoPineCone } from '@/lib/pinecone';
import { Chats } from "../../../models/Chat"
import { connectToDatabase } from '@/lib/mongodb';


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json();
    const { fileUrl, fileKey } = body as { fileUrl: string, fileKey: string };

    if (!fileUrl) {
      return NextResponse.json({ error: 'Missing fileUrl' }, { status: 400 });
    }

    await loadS3IntoPineCone(fileKey);


    const newChat = await Chats.create({
      pdfName: fileKey,
      pdfUrl: fileUrl,
      fileKey: fileKey


    })





    return NextResponse.json({
      success: true,
      chat_id: newChat._id

    },
  {
    status:200
  });
  } catch (err) {
    console.log('❌ Error in create-chat:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
