import { set } from "date-fns";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const locales = {
    "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

// dummy events (fake data)
// const events = [
//     {
//         title: "CS307 Demo",
//         allDay: true,
//         start: new Date(2023, 9, 12),
//         end: new Date(2023, 9, 12),
//     },
//     {
//         title: "Sprint 1 Wrap Up",
//         start: new Date(2023, 9, 13),
//         end: new Date(2023, 9, 16),
//     },
//     {
//         title: "Sprint 2 Starts",
//         start: new Date(2023, 9, 17),
//         end: new Date(2023, 9, 17),
//     },
// ];

export default function ViewCalendar() {
    const navigate = useNavigate();
    const my_username = sessionStorage.getItem('username');
    const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */
    const ref = useRef(null);

    const [errMsg, setErrMsg] = useState('');
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [isCreating, setisCreating] = useState(false);
    const [isAdding, setisAdding] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [calEvents, setCalEvents] = useState([]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn == 'false') {
            navigate("/login");
        }

        setErrMsg('');
        getEvents();
    }, [newEvent.title, newEvent.start, newEvent.end])

    async function getEvents() {
        console.log("Getting calendar events for user " + my_username);
        try {
            let res = await fetch('http://localhost:5000/api/get_calendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": my_username }),
            });

            const data = await res.json();
            console.log(data);
            
            if (res.status == 500) {
                setErrMsg(data.error);
                return;
            } else if (res.status == 200) {
                setCalEvents(data.calendar);
                setAllEvents(data.calendar.map(event => ({
                    title: event.title,
                    start: new Date(event.start_date),
                    end: new Date(event.end_date),
                })));
                return;
            }
        } catch (error) {
            setErrMsg(error);
            console.log(error);
            return;
        }
    }

    async function handleAddEvent() {
        console.log("Adding event!");
        if (newEvent.title === "") {
            setErrMsg('Event Not Possible: Empty Title!');
            return;
        }

        if (newEvent.start === "") {
            setErrMsg('Event Not Possible: Empty Start Date!');
            return;
        }

        if (newEvent.end === "") {
            setErrMsg('Event Not Possible: Empty End Date!');
            return;
        }

        let body_vals = {
            "username": my_username,
            "title": newEvent.title,
            "start": newEvent.start,
            "end": newEvent.end,
            "description": "",
            "location": "",
            "organization_id": "0"
        }

        try {
            let res = await fetch('http://localhost:5000/api/add_calendar_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body_vals),
            });

            const data = await res.json();

            if (res.status != 200) {
                setErrMsg(data.error);
                console.log(data.error)
                return;
            } else {
                setNewEvent({ title: "", start: new Date(), end: new Date() });
                setisAdding(false);
                getEvents();
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }   

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const [editedEvent, setEditedEvent] = useState({ title: "", start: "", end: "" });
    const [ oldEditEvent, setOldEditEvent ] = useState({ title: "", start: "", end: "" });

    const handleTitleChange = (e) => {
        setEditedEvent({ ...editedEvent, title: e.target.value });
    };

    const handleStartChange = (date) => {
        setEditedEvent({ ...editedEvent, start: date });
    };

    const handleEndChange = (date) => {
        setEditedEvent({ ...editedEvent, end: date });
    };

    const handleSave = async () => {
        if (editedEvent.title === "") {
            setErrMsg('Event Not Possible: Empty Title!');
            return;
        }

        if (editedEvent.start === "") {
            setErrMsg('Event Not Possible: Empty Start Date!');
            return;
        }

        if (editedEvent.end === "") {
            setErrMsg('Event Not Possible: Empty End Date!');
            return;
        }

        const matchingEvent = calEvents.find((event) =>
            event.title === oldEditEvent.title
        );

        let body_vals = {
            "username": my_username,
            "title": editedEvent.title,
            "start": editedEvent.start,
            "end": editedEvent.end,
            "description": "",
            "location": "",
            "organization_id": "0",
            "id": matchingEvent.id
        }

        try {
            let res = await fetch('http://localhost:5000/api/update_calendar_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body_vals),
            });

            const data = await res.json();
            if (res.status != 200) {
                setErrMsg(data.error);
                console.log(data.error)
                return;
            } else {
                setEditedEvent({ title: "", start: "", end: "" });
                setisCreating(false);
                getEvents();
            }
        } catch (error) {
            setErrMsg(error);
            console.log(error);
            return;
        }

        setisCreating(false);
    };

    const onCancel = () => {
        setisCreating(false);
    };

    const onDelete = async () => {
        console.log("Deleting event");
        const matchingEvent = calEvents.find((event) =>
            event.title === oldEditEvent.title
        );
        
        console.log(calEvents);
        console.log(matchingEvent);

        let body_vals = {
            "username": my_username,
            "id": matchingEvent.id
        }

        try {
            let res = await fetch('http://localhost:5000/api/delete_calendar_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body_vals),
            });

            const data = await res.json();
            if (res.status != 200) {
                setErrMsg(data.error);
                console.log(data.error)
                return;
            } else {
                setEditedEvent({ title: "", start: "", end: "" });
                setisCreating(false);
                getEvents();
            }
        } catch (error) {
            setErrMsg(error);
            console.log(error);
            return;
        }
        
        setisCreating(false);
    };

    const onAddCancel = () => {
        setisAdding(false);
    }

    const handleEdit = (e) => {
        console.log(e);
        setEditedEvent(e);
        setOldEditEvent(e);
        setisCreating(true);
    }

    const addNewEvent = () => {
        setisAdding(true);
    }

    return (
        <div style={{ background: '#292323', borderRadius: '25px' }}>
            {isCreating == false && isAdding === false && (
                <div className="App">
                    <h1>Your Calendar</h1>
                    <br />
                    <button onClick={addNewEvent}>Add New Event</button>
                    <Calendar localizer={localizer} events={allEvents}
                        startAccessor="start" endAccessor="end"
                        style={{ height: 500, margin: "50px" }}
                        onSelectEvent={handleEdit}
                    />
                </div>
            )}
            {
                isCreating === true && (
                    <div>
                        <h2>Editing Event:</h2>
                        <input type="text"
                            value={editedEvent.title}
                            onChange={handleTitleChange}
                            filterTime={filterPassedTime}
                            placeholder={editedEvent.title} />
                        <DatePicker
                            minDate={new Date()}
                            showTimeSelect
                            selected={editedEvent.start}
                            onChange={handleStartChange} />
                        <DatePicker
                            showTimeSelect
                            selected={editedEvent.end}
                            filterTime={filterPassedTime}
                            minDate={new Date()}
                            onChange={handleEndChange} />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={onDelete}>Delete</button>
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                )
            }
            {isAdding === true && (
                <div style={{ background: 'black', padding: '20px' }}>
                    <h2>Add New Event:</h2>
                    <div>
                        <input type="text"
                            placeholder="Add Title"
                            style={{ width: "20%", marginRight: "10px" }}
                            value={newEvent.title}
                            onChange={(e) => setNewEvent(
                                { ...newEvent, title: e.target.value }
                            )}
                        />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                        <DatePicker placeholderText="Start Date"
                            showTimeSelect
                            minDate={new Date()}
                            filterTime={filterPassedTime}
                            style={{ marginRight: "10px" }}
                            selected={newEvent.start}
                            onChange={(start) => setNewEvent({ ...newEvent, start })}
                        />
                        <DatePicker placeholderText="End Date"
                            showTimeSelect
                            filterTime={filterPassedTime}
                            minDate={new Date()}
                            style={{ marginRight: "10px" }}
                            selected={newEvent.end}
                            onChange={(end) => setNewEvent({ ...newEvent, end })}
                        />
                        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
                            Add Event
                        </button>
                        <button onClick={onAddCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}
