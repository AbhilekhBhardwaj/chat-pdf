import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import PdfViewer from './components/PdfViewer';
import Upload from './components/Upload';

function App() {
    const [pdfText, setPdfText] = useState('');

    const handlePdfUpload = (text) => {
        setPdfText(text);
    };

    return (
        <div className="App">
            <Upload onUpload={Upload} />
            {pdfText && (
                <div className="content">
                    <PdfViewer pdfText={pdfText} />
                    <Chat pdfText={pdfText} />
                </div>
            )}
        </div>
    );
}

export default App;