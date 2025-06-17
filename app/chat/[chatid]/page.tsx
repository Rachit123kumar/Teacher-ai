// app/chat/[chatid]/page.tsx

import { connectToDatabase } from '@/lib/mongodb';
import { Chats } from '@/models/Chat';
import PDFViewer from '@/components/myComponent/PDFViewer';
import ChatComponent from '@/components/myComponent/ChatComponent';

export default async function Page({
  params,
}: {
  params: Promise<{ chatid: string }>;
}) {
  const { chatid } = await params;

  await connectToDatabase();
  const chat = await Chats.findOne({ _id: chatid });

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          No chat found for ID: {chatid}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
      {/* PDF Viewer Section */}
      <div className="hidden md:flex w-1/2 h-full p-4">
        <div className="w-full h-full bg-white rounded-xl shadow-md overflow-auto border border-gray-200">
          <PDFViewer
            pdfUrl={
              chat.pdfUrl ||
              'https://pub-105fec70566540d1a4cf3698e960bfa4.r2.dev/uploads/17498742218679-maths-numbersystem.pdf'
            }
          />
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-full md:w-1/2 h-full bg-white p-4 flex flex-col shadow-inner border-l border-gray-200">
        <div className="text-xl font-semibold mb-3 text-center border-b pb-2">
          Chat with your PDF
        </div>
        <ChatComponent fileKey={chat.fileKey} />
      </div>
    </div>
  );
}
