import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useRef, useEffect} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

// dummy events (fake data)
const events = [
    {
        title: "CS307 Demo",
        allDay: true,
        start: new Date(2023, 9, 12),
        end: new Date(2023, 9, 12),
    },
    {
        title: "Sprint 1 Wrap Up",
        start: new Date(2023, 9, 13),
        end: new Date(2023, 9, 16),
    },
    {
        title: "Sprint 2 Starts",
        start: new Date(2023, 9, 17),
        end: new Date(2023, 9, 17),
    },
];

export default function ViewCalendar() {
    const errRef = useRef(); /* Set focus on an error, to allow accessibility purposes */

    const[errMsg, setErrMsg] = useState('');
    const[newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const[isCreating, setisCreating] = useState(false);

    const[startTime, setStartTime] = useState(0);
    const[endTime, setEndTime] = useState(0);

    useEffect(() => {
        setErrMsg('');
    }, [newEvent.title, newEvent.start, newEvent.end])

    const [allEvents, setAllEvents] = useState(events);
    // pushes new event onto the array of all events so far
    function handleAddEvent() {
        if(newEvent.title === "") {
            setErrMsg('Event Not Possible: Empty Title!');
            return;
        }
        if(newEvent.start === "") {
            setErrMsg('Event Not Possible: Empty Start Date!');
            return;
        }
        if(newEvent.end === "") {
            setErrMsg('Event Not Possible: Empty End Date!');
            return;
        }
        setAllEvents([...allEvents, newEvent])
        //const check = new Date(newEvent.start);
        //console.log(check);
        console.log(startTime);
        console.log(endTime);
    }

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        
        
        return currentDate.getTime() < selectedDate.getTime();
    };

    const grabStartTIme = (time) => {
        setStartTime(time.getHours());
    }

    const grabEndTime = (time) => {
        setEndTime(time.getHours());
    }

    // REMOVE EVENTS LOGIC
    const handleRemove = (e) => {
        console.log('Hello')
        const r = window.confirm("Would you like to remove this event?")
        if(r === true){
             const events = allEvents;
             const idx = events.indexOf(e);
             events.splice(idx, 1);
             setAllEvents(events);
          }
    }
    return (
    <div className="App">
        <h1>Your Calendar</h1>
        <br />
        <h2>Add New Event:</h2>
        <div>
            <input type="text"
                placeholder="Add Title"
                style={{width: "20%", marginRight: "10px"}}
                value={newEvent.title} 
                onChange={(e) => setNewEvent(
                    {...newEvent, title: e.target.value}
                )}
                />
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <DatePicker placeholderText="Start Date" 
            showTimeSelect
            //timeClassName={grabStartTIme}
            minDate={new Date()}
            filterTime={filterPassedTime}
            style={{marginRight: "10px"}}
            selected={newEvent.start} 
            onChange={(start) => setNewEvent ({...newEvent, start})}
            />
            <DatePicker placeholderText="End Date" 
            showTimeSelect
            filterTime={filterPassedTime}
            minDate={new Date()}
            //timeClassName={grabEndTime}
            style={{marginRight: "10px"}}
            selected={newEvent.end} 
            onChange={(end) => setNewEvent ({...newEvent, end})}
            />
            <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
                Add Event
            </button>
        </div>
        <Calendar localizer={localizer} events={allEvents} 
        startAccessor="start" endAccessor="end" 
        style={{height: 500, margin:"50px"}}
        onSelectEvent={handleRemove}
        />
    </div>
  )
}
