import React, { useState } from 'react'

function TestProfile() {
    const[isMessaging, setIsMessageing] = useState(false); 

    const messageUser = () => {
        setIsMessageing(true);
    }

    return (
        <div>
            <button onClick={messageUser}>Message</button>
            { isMessaging && (
                <div className='messaging'>
                    <h1>Message:</h1>
                </div>
            )}
        </div>
    )
}

export default TestProfile