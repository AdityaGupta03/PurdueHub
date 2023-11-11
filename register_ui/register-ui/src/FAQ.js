import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'


import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW

import './Club.css'
import './Profile.css'
function FAQ() {

    const navigate = useNavigate();

    const [questionGiven, setQuestionGiven] = useState(''); // question given by user

    const [showAnswerPage, setShowAnswerPage] = useState(false); // true or false controlling viewing an aswer
    const [question, setQuestion] = useState(false); // display on page
    const [answer, setAnswer] = useState(false); // display on page

    const [showSubmitQuestionPage, setShowSubmitQuestionPage] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */

    const sampleQuestions = [
        {
            question: 'Q: I am an incoming freshman for the upcoming year at Purdue, I was wondering what are the essentials that I should bring and or buy?',
            answer: ' First of all, congratulations on getting accepted into Purdue! We know this is a sudden change in your life, and you may be a bit lost in navigating this new chapter of your life, don’t worry we are here to help you! When it comes to essentials that you should bring and or buy, we recommend checking out the Purdue subreddit’s wiki page shows an exhaustive list of items you should consider bringing or buying once you get here!            '
        },
        {
            question: 'Q: I am a little overwhelmed on my degree requirements and or classes that I should be taking. Where should I look towards for information?',
            answer: 'Don’t worry! Your assigned advisor is there to help you, they will recommend routes that you can take given your major requirements, your interests, and any other factors. A tool you can use for being proactive in your graduation path is using mypurdueplan, it’ll lay out all your required classes, give you detailed information on said classes, provide you information on your current status, allow you to plan for future semesters, etc. It’s a really handy tool every Purdue student should utilize! We also recommend on platforms such as the Purdue subreddit for any posts regarding recommended classes for your major, and as well testimonials from other fellow peers who are taking or have taken classes you are interested in. '
        },
        {
            question: 'Q: I am curious about all the organizations and clubs that exist here at Purdue, where could I find information regarding this?',
            answer: 'There is a large diversity of people here at Purdue, with everyone’s own unique interests, organizations and clubs exist to group common interests together. You can get to know people as well as create friendships through these organizations. A tool you can use for finding clubs or organizations would be through BoilerLink! It’ll not only give you detailed information on the organizations here at Purdue, but as well as their specific events coming up, contact info to reach out to them, and any other important information!            '
        },
    ];

    useEffect(() => {
        setErrMsg('');
    }, [questionGiven])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (questionGiven === '') {
            setErrMsg("Error: Empty Question Given");
        }
        else {
            viewAskQuestionPage(false);

            toast.success('Successfully Sent Your Question!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const viewAnswerPage = async (question, answer) => {
        if (showAnswerPage) {
            // If no longer on the viewing event page
            setShowAnswerPage(false);
        }
        else {
            // If viewing event page
            setQuestion(question);
            setAnswer(answer);
            setShowAnswerPage(true);
        }
    }

    const viewAskQuestionPage = async () => {
        if (showSubmitQuestionPage) {
            // If no longer on the viewing event page
            setShowSubmitQuestionPage(false);
        }
        else {
            // If viewing event page
            setShowSubmitQuestionPage(true);
        }
    }
    return (
        <>
            <ToastContainer
                theme="colored"
                position="top-right"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {showAnswerPage ? (
                <div className='whole'>
                    <div className='containbtn'>
                        <button className='actualbtn' onClick={() => viewAnswerPage("hello", "hello")}>Back</button>
                    </div>
                    <br />
                    <div className='intro'>
                        <h3 className='question'>{question}</h3>
                    </div>

                    <div className='summaryText'>
                        <h3>Answer:</h3>
                        <p>{answer}</p>
                        <br />
                    </div>

                </div>
            ) : (
                <div>
                    {showSubmitQuestionPage ? (
                        <div>
                            <section style={{ maxWidth: 'auto', minWidth: '600px' }}>
                                <div className='containbtn'>
                                    <button className='actualbtn' onClick={() => setShowSubmitQuestionPage(false)}>Back</button>
                                </div>
                                <br />
                                <h1>Submit Question To Us</h1>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offsreen"}>{errMsg}</p>
                                <form onSubmit={handleSubmit}>
                                    {/* Question */}
                                    <label htmlFor='question'>Your Question:</label>
                                    <textarea
                                        id='question'
                                        placeholder='Please Input A Question To Us'
                                        rows={11}
                                        cols={40}
                                        onChange={(e) => setQuestionGiven(e.target.value)}
                                    />
                                    <button type='submit'>
                                        Submit Question
                                    </button>
                                </form>
                            </section>
                        </div>
                    ) : (
                        <div className='whole'>
                            <div className='containbtn'>
                                <button className='actualbtn' onClick={() => navigate("/")}>Back</button>
                            </div>
                            <br />
                            <div className='test'>
                                <h1 className='test'>FAQ</h1>
                            </div>

                            <div className='test'>
                                <h3>Commonly Asked Questions:</h3>
                            </div>

                            <div className='eventCtn'>
                                <div>
                                    {sampleQuestions.map((item, index) => {
                                        return (
                                            <Link style={{ textDecorationLine: 'none' }} onClick={() => viewAnswerPage(item.question, item.answer)}>
                                                <div key={index} className='event'>
                                                    <h3>Question:</h3>
                                                    <p className='wrapText'>{item.question}</p>
                                                    <h3>Answer: </h3>
                                                    <p className='wrapText'>{item.answer}</p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <button className='ask-left' onClick={() => viewAskQuestionPage()}>Want To Ask A Question?</button>

                        </div>
                    )}

                </div>
            )}
        </>
    )
}

export default FAQ