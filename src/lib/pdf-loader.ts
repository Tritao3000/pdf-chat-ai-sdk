import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { env } from './config';
import { UnstructuredLoader } from 'langchain/document_loaders/fs/unstructured';

export async function getChunkedDocsFromPDF() {
  try {
    let loaders = [
      new PDFLoader('src/lib/ro.pdf'),
      new PDFLoader('src/lib/joao.pdf'),
      new PDFLoader('src/lib/intro.pdf'),
    ];
    let pages = [];
    for (let loader of loaders) {
      pages.push(...(await loader.load()));
    }

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
