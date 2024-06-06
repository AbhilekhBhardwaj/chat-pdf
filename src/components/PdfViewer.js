import React from 'react';

const PdfViewer = ({ pdfText }) => {
    return (
        <div className="pdf-viewer">
            <pre>{pdfText}</pre>
        </div>
    );
};

export default PdfViewer;