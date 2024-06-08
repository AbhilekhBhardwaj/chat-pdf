import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import axios from 'axios';
import './App.css';

// Manually set the workerSrc property for pdfjsLib to a specific version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      extractTextFromPdf(fileUrl);
    }
  };

  const extractTextFromPdf = async (url) => {
    const pdf = await getDocument(url).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(' ');
    }
    setPdfText(text);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = inputMessage.trim();
      setMessages([...messages, { type: 'user', text: userMessage }]);
      setInputMessage('');
      const response = await sendMessageToOpenAI(userMessage);
      setMessages([...messages, { type: 'user', text: userMessage }, { type: 'bot', text: response }]);
    }
  };

  const sendMessageToOpenAI = async (message) => {
    const prompt = `${pdfText}\n\nUser: ${message}\nChatGPT:`;
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  };

  return (
    <div className="App">
      {!pdfFile ? (
        <div className="upload-container">
          <h1>Upload a PDF</h1>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
      ) : (
        <div className="viewer-container">
          <div className="pdf-viewer">
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
              <Viewer fileUrl={pdfFile} />
            </Worker>
          </div>
          <div className="chat-container">
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>{message.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                placeholder="Type a message..." 
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;