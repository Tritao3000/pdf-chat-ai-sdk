import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { env } from './config';
import { UnstructuredLoader } from 'langchain/document_loaders/fs/unstructured';

export async function getChunkedDocsFromPDF() {
  try {
    let loaders = [
      new PDFLoader('ro.pdf'),
      new PDFLoader('joao.pdf'),
      new PDFLoader('intro.pdf'),
      new UnstructuredLoader('https://augustalabs.co'),
    ];
    let pages = [];
    for (let loader of loaders) {
      pages.push(...(await loader.load()));
    }

    // From the docs https://www.pinecone.io/learn/chunking-strategies/
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });

    const chunkedDocs = await textSplitter.splitDocuments(pages);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error('PDF docs chunking failed !');
  }
}
