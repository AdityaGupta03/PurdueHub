import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const ReportSubmission = () => {
    const navigate = useNavigate();
    const reportee_user = sessionStorage.getItem('username');

    const userRef = useRef();
    const reasonRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [reason, setReason] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn == 'false') {
            navigate('/login');
        }

        setErrMsg('');
    }, [username, reason]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(username);
            console.log(reportee_user);
            console.log(reason);
            const response = await fetch("http://127.0.0.1:5000/api/report_user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "reported": username, "reportee": reportee_user, "msg": reason }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setSuccess(true);
            } else {
                const error_msg = 'Error: ' + data.error;
                setErrMsg(error_msg);
                setSuccess(false);
                errRef.current.focus();
            }
        } catch (error) {
            console.error('Error:', error);
            setErrMsg('Error occurred when submitting the report');
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Report Submitted Successfully!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                        {errMsg}
                    </p>
                    <h1>Report Submission</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="reason">Report Reason:</label>
                        <textarea
                            id="reason"
                            ref={reasonRef}
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                            required
                        />
                        <button>Submit Report</button>
                    </form>
                </section>
            )}
        </>
    );
};

export default ReportSubmission;