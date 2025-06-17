import { Pinecone } from '@pinecone-database/pinecone';

import { downloadFromS3 } from './s3-server';

import { Document } from "langchain/document";
import md5 from "md5";

import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// import { getEmbedding } from './embedding'; // Assumes getEmbedding is defined elsewhere
import { getEmbedding } from "./embedding"

let pineconeClient: Pinecone | null = null;

export async function getPineconeClient(): Promise<Pinecone> {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    
  }
  return pineconeClient;
}

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPineCone(fileKey: string): Promise<PDFPage[] | undefined> {
  // console.log("Downloading s3 file into local system");
  try {
    const fileName = await downloadFromS3(fileKey);
    if (!fileName) throw new Error("No fileName exists");

    const loader = new PDFLoader(fileName);
    const pages = (await loader.load()) as PDFPage[];

    const documentsNested = await Promise.all(pages.map(prepareDocument));
    const documents = documentsNested.flat();

    const vectors = await Promise.all(documents.map(embedDocument));

    const client = await getPineconeClient();
    const pineconeIndex = client.index('teachersai');
    const namespace = convertToAscii(fileKey);

    // console.log('Inserting documents into Pinecone');

    // console.log('Inserting documents into Pinecone');

    // console.log('Inserting documents into Pinecone');
    // console.log(vectors)

    await pineconeIndex.namespace(namespace).upsert(vectors);

    return documentsNested[0] as any



  } catch (err) {
    console.error("Error in loadS3IntoPineCone:", err);
  }
}

export function convertToAscii(text: string): string {
  return text.replace(/[^\x00-\x7F]+/g, "");
}

async function embedDocument(doc: Document){
  try {
    const embeddings = await getEmbedding(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (err) {
    console.error("Error in embedDocument:", err);
    throw new Error("Embedding failed");
  }
}

export function truncateStringByBytes(str: string, bytes: number): string {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
}

async function prepareDocument(page: PDFPage): Promise<Document[]> {
  const { loc: { pageNumber } } = page.metadata;
  const cleanedContent = page.pageContent.replace(/\n/g, ' ');

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent: cleanedContent,
      metadata: {
        pageNumber,
        text: truncateStringByBytes(cleanedContent, 36000),
      },
    })
  ]);

  return docs;
}
