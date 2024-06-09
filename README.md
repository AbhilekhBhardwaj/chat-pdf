# PDF Chat Application

This project is a PDF Chat Application built with React. Users can upload a PDF, view its contents, and interact with a chat interface that uses OpenAI's GPT-3.5 model to provide responses based on the PDF content and user input.

# Features

- Upload and view PDF files.
- Extract text content from PDF files.
- Chat interface to interact with the extracted PDF content using OpenAI's GPT-3.5 model.

*Set up environment variables

   Create a `.env` file in the root directory of the project and add your OpenAI API key:
   
    REACT_APP_OPENAI_API_KEY=your_openai_api_key
 

## Usage

1. Upload a PDF:
   - Click on the upload button and select a PDF file to upload.

2. View PDF contents:
   - The left half of the screen will display the PDF file.

3. Interact with the chat:
   - Type a message in the chat interface on the right half of the screen and hit send.
   - The chat will respond based on the content of the uploaded PDF and your input.



## Dependencies

- **React**: Frontend library.
- **Axios**: Promise-based HTTP client for making API requests.
- **@react-pdf-viewer/core**: React component for displaying PDF files.
- **pdfjs-dist**: PDF.js library for parsing PDF files.
