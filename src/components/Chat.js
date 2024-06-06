import React, { useState } from 'react';

const Chat = ({ pdfText }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        console.log(process.env.REACT_APP_OPENAI_API_KEY);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use the environment variable here
                },
                body: JSON.stringify({
                    model: 'gpt-3.5',
                    messages: [
                        { role: 'system', content: pdfText },
                        { role: 'user', content: input }
                    ],
                }),
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;
            setMessages([...newMessages, { role: 'bot', content: botMessage }]);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }

        setInput('');
    };

    return (
        <div className="chat-container">
            <div id="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.role}: {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
            />
            <button id="send-btn" onClick={handleSend}>
                Send
            </button>
        </div>
    );
};

export default Chat;