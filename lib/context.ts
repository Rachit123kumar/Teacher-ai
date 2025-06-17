
import { getEmbedding } from "./embedding";
import { convertToAscii, getPineconeClient } from "./pinecone";



export async function getMatchesFromEmbedding(embeddings: number[], fileKey: string) {
  const pineconeClient = await getPineconeClient();
  const index = pineconeClient.index('teachersai', process.env.PINECONE_INDEX_HOST!);
  const namespace = index.namespace(convertToAscii(fileKey));

  try {
    const response = await namespace.searchRecords({
      query: {
        topK: 3,
        vector: { values: embeddings },
      },
      fields: ['text', 'pageNumber'],
    });

    return response.result.hits|| []; // ✅ Correct shape

  } catch (err) {
    console.error(err);
    throw new Error("Error in getMatchesFromEmbedding");
  }
}


export async function getContext(query:string,fileKey:string){

    const queryEmbedding=await getEmbedding(query);
    const matches=await getMatchesFromEmbedding(queryEmbedding,fileKey);


    const qualifyingDocs=matches.filter((el)=>el._score&& el._score>0.1);

    type Metatdata={
        text:string,
        pageNumber:2
    }


    let docs=qualifyingDocs.map((el)=>(el.fields as Metatdata).text )

    return docs.join('/n').substring(0,3000);




}