import React from 'react';

const Upload = ({ onUpload }) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const text = await file.text();
            onUpload(text);
        }
    };

    return (
        <div className="upload-container">
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default Upload;