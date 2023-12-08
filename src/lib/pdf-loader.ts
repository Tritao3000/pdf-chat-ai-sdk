import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { TextLoader } from 'langchain/document_loaders/fs/text';

export async function getChunkedDocsFromPDF() {
  try {
    const loader = new TextLoader('src/lib/augusta.txt');

    const pages = await loader.load();

    // From the docs https://www.pinecone.io/learn/chunking-strategies/
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunkedDocs = textSplitter.splitDocuments(pages);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error('PDF docs chunking failed !');
  }
}
