import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import "dotenv/config";

// Load documents
const loader = new PDFLoader("./pdfs/letter-to-shareholders-amazon.pdf");

// loads one Document object per PDF page
const docs = await loader.load();

// Split documents into chunks
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const allSplits = await textSplitter.splitDocuments(docs);

// Embedding
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});

// Next lines only to visualize vectors
// const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
// const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);

// console.assert(vector1.length === vector2.length);
// console.log(`Generated vectors of length ${vector1.length}\n`);
// console.log(vector1.slice(0, 10));
// End of visualization

const vectorStore = new MemoryVectorStore(embeddings);
await vectorStore.addDocuments(allSplits);

const result = await vectorStore.similaritySearch("Who signed this?");

console.log(result[0].pageContent);
