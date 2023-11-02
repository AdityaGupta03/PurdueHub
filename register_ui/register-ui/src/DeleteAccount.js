import React from 'react'

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";
import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DeleteAccount() {
    
    const [openDialog, handleDisplay] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');


    const handleClose = () => {
        handleDisplay(false);
     }
  
     const openDialogBox = () => {
        handleDisplay(true);
     }
    
    const handleConfirm = async () => {

        let my_username = sessionStorage.getItem('username');
        console.log("Deleting account for: " + my_username);
        
        if ( message != '' ) {
            let my_userid = sessionStorage.getItem('user_id');
            try {
                const response = await fetch("http://127.0.0.1:5000/api/submit_feedback", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "user_id": my_userid, "feedback_title": "", "feedback_body": message }),
                });
            } catch (error) {
                console.log(error);
                return;
            }
        }

        try {
            let res = await fetch('http://localhost:5000/api/delete_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: my_username }),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log("Error:" + error);
        }

        setSuccess(true);
        handleDisplay(false);
    }

  return (
    <>
        {success ? (
            <div>
                <section>
                    <h1>Your acccount has been successfully deleted</h1>
                    { message != '' && (
                        <h3>Thank you for your feedback!</h3>
                    )}
                    <p>
                        <Link to="/login">Back To Login</Link>
                    </p>
                </section>
            </div>
        ): (
        <div>
            <section style={{maxWidth: 'auto', minWidth: '600px'}}>
                <h1>
                    Delete Your Account
                </h1>
                <label htmlFor='message'>Your Feedback (Optional):</label>
                    <textarea
                        id='message'
                        placeholder='Why are you deleting your account with us today?'
                        rows={11}
                        cols={40}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />  
                <button onClick = {openDialogBox}>
                    Delete Acount
                </button>
                <Dialog onClose = {handleClose} open = {openDialog}>
                    <DialogTitle> Delete Account? </DialogTitle>
                        <h3 style = {{ marginTop: "-10px", padding: "5px 10px" }}>
                            Are you sure you want to delete your PurdueHub account? 
                            <br />
                            You cannot recover your account after you delete it!
                        </h3>
                        <br></br>
                        <div>
                            <button onClick = {handleConfirm}>
                                Confirm
                            </button>
                            <button onClick = {handleClose}>
                                Cancel
                            </button>
                        </div>
                </Dialog>
                <p style = {{color: 'red'}}>Warning: Deleting your account is permanent, 
                    there is no recovery possible of a deleted account.
                    <br />
                    Continue at your own discretion.
                </p>
            </section>
        </div>
        )}
    </>
    
  )
}

export default DeleteAccount