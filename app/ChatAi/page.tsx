'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RiLoader2Fill } from 'react-icons/ri';
import { uploadToS3 } from '@/lib/s3';

const Page = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ fileKey, fileUrl }: { fileKey: string; fileUrl: string }) => {
      const res = await axios.post('/api/create-chat', { fileKey, fileUrl });
      return res.data;
    },
    mutationKey: ['chat'],
    onError: () => toast("❌ Error occurred during chat creation"),
    onSuccess: (data) => {
      toast("✅ Chat created successfully");
      router.push(`/chat/${data.chat_id}`);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      setFile(null);
      return;
    }

    if (!['application/pdf', 'text/plain'].includes(selected.type)) {
      setError('Only PDF or text files are allowed');
      setFile(null);
      return;
    }

    setFile(selected);
    setUploading(true);

    try {
      const data = await uploadToS3(selected);
      if (!data?.fileKey || !data?.fileUrl) throw new Error("Missing fileKey or fileUrl");
      mutate({ fileKey: data.fileKey, fileUrl: data.fileUrl });
    } catch (err) {
      console.error(err);
      toast("❌ File upload failed");
    } finally {
      setUploading(false);
    }

    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-[80px]"><path fill="#1e3a8a" d="M0,64L48,101.3C96,139,192,213,288,224C384,235,480,181,576,165.3C672,149,768,171,864,165.3C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-sky-500 text-transparent bg-clip-text mb-4 text-center">
          Upload & Chat With Your PDF
        </h1>
        <p className="text-center text-white/80 max-w-xl mb-8">
          Upload a <span className="font-semibold">PDF</span> or <span className="font-semibold">Text</span> file and start asking questions about its content using AI.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl w-full max-w-md">
          {!isPending && !uploading && (
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="w-full text-white file:bg-blue-200 file:text-blue-900 file:px-4 file:py-2 file:rounded-md file:cursor-pointer bg-transparent"
            />
          )}

          {error && <p className="text-red-300 mt-2 text-sm">{error}</p>}
          {file && <p className="mt-4 text-green-200 text-sm">Uploaded: {file.name}</p>}

          {(uploading || isPending) && <RiLoader2Fill className="animate-spin text-white text-2xl mx-auto mt-4" />}
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-[80px]"><path fill="#1e3a8a" d="M0,192L48,165.3C96,139,192,85,288,80C384,75,480,117,576,128C672,139,768,117,864,96C960,75,1056,53,1152,74.7C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
    </div>
  );
};

export default Page;
