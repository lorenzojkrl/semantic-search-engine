# Semantic Search Engine Using Langchain

Build a semantic search engine using Langchain.
In short, we will load a PDF and query it.

## 1. Installation and Setup

- **Installing Dependencies:**

  - Run `npm install`

## 2. Loading PDFs

- **PDFLoader:**  
  The `PDFLoader` from `@langchain/community` is used to load a PDF file.
  - Each PDF page is converted into a separate Document object.
  - Each Document includes the page content along with metadata, such as the source file path, page number, and additional PDF information.

## 3. Splitting Documents

- **Text Splitting:**  
  To enhance information retrieval and downstream processing, documents are split into smaller chunks using:
  - `RecursiveCharacterTextSplitter`: This splitter divides the text into chunks of 1000 characters each with an overlap of 200 characters.
  - This overlapping strategy ensures that important context isn’t lost between chunks.

## 4. Creating Embeddings

- **Embedding Overview:**  
  Embeddings converts text into numerical vectors that capture semantic relationships. Unlike keyword matching, embedding-based approaches compare vector similarities (e.g., using cosine similarity).

- **Using OpenAI Embeddings:**
  - Given the `@langchain/openai` package, the OpenAI embeddings model (`text-embedding-3-large`) is used to generate dense vectors.

## 5. Indexing with a Vector Store

- **VectorStore Overview:**
  - The post introduces the `MemoryVectorStore` from the Langchain package for storing and querying document embeddings in memory.
  - Documents (or their split chunks) are added to the vector store, making them ready for semantic search.

## 6. Querying the Vector Store

- **Semantic Search:**
  - The vector store supports similarity searches, where a query (transformed into an embedding) is used to retrieve the most relevant document chunks.
  - The provided example shows how to query the store with a string (e.g., "What is the company's name?") and return the best matching document content.

## Conclusion

The guide outlines a complete workflow for building a semantic search engine:

- From loading a PDF and splitting it into manageable text chunks,
- To creating embeddings using OpenAI’s model,
- And finally storing and querying these embeddings using an in-memory vector store.

This process lays a practical foundation for developing applications such as question-answering systems and retrieval augmented generation (RAG) tools using Langchain.
