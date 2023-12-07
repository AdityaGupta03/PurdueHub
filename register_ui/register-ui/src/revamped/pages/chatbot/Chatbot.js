import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';
import './Chatbot.scss'

import './profile_icon.jpeg'
import './chatgpt_pic.jpeg'

function ChatBot() {
    const navigate = useNavigate();

    let [chat, setChat] = useState([]);
    let [userInput, setUserInput] = useState("");
    const lorem = "An applicable message I can send back to the user in a meaningful amoumt of time. Like I can say this or that instead of traditional lorem ipsum which helps nobody. We can checkout reviews here and there.";
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn == 'false') {
           navigate('/login');
        }
    }, []);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (userInput.trim() === '') return;

        console.log("Sending message to chatbot: " + userInput);
        setUserInput('');

        try {
            let response = await fetch('http://127.0.0.1:5000/api/chat_bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_statement: userInput }),
            });

            let data = await response.json();
            console.log(data);

            if (response.status == 200) {
                setChat([...chat,
                { text: userInput, type: 'usersend' },
                { text: data.message.content, type: data.message.role }
                ]);
            } else {
                console.log('Error getting response from chatbot API');
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="chat-bot-container">
            <div className="chat-history">
                {chat.map((message, index) => (
                    <div key={index} className={message.type}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className='wrapper-input'>
                <div className="user-input">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <button onClick={handleSendMessage} disabled={userInput ? false : true} className={userInput ? 'enabled' : 'disabled'}>Send</button>
                </div>
            </div>
        </div>
    );



}

export default ChatBot;