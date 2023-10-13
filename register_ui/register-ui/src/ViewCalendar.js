import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
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
    const[newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    
    const [allEvents, setAllEvents] = useState(events);
    // pushes new event onto the array of all events so far
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
        console.log(newEvent.start);
        console.log(newEvent.end);
    }

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
    <div className="App">
        <h1>Calendar</h1>
        <h2>Add New Event</h2>
        <div>
            <input type="text"
                placeholder="Add Title"
                style={{width: "20%", marginRight: "10px"}}
                value={newEvent.title} 
                onChange={(e) => setNewEvent(
                    {...newEvent, title: e.target.value}
                )}
                />
            <DatePicker placeholderText="Start Date" 
            showTimeSelect
            filterTime={filterPassedTime}
            style={{marginRight: "10px"}}
            selected={newEvent.start} 
            onChange={(start) => setNewEvent ({...newEvent, start})}
            />
            <DatePicker placeholderText="End Date" 
            showTimeSelect
            filterTime={filterPassedTime}
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
        style={{height: 500, margin:"50px"}}/>
    </div>
  )
}
