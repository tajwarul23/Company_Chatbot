// npm install langchain @langchain/community pdf-parse
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import ollama from 'ollama'

export const indexTheDocument = async (filePath) => {
  try {
     //by default langchain returns each pdf page is an object, all the pages of that pdf are stored in an array of object
     //if we set {splitPages:false} then the whole pdf file will be just one single object of that array

     /** Load the document */
    const loader = new PDFLoader(filePath, {splitPages:false});
    const doc = await loader.load();
   

    /** Chunk the document */
    const textSplitter = new RecursiveCharacterTextSplitter({chunkSize:500, chunkOverlap:100});
    const texts = await textSplitter.splitText(doc[0].pageContent)
     console.log(texts.length);

//      /**Generate vector embeddings */
     const response = await ollama.chat({
  model: 'llama3.1',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)
   
  } catch (error) {
    console.log("Error loading the pdf", error.message);

  }
};
