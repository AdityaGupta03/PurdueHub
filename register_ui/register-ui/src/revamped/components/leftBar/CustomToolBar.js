import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './customToolBar.scss'
const CustomToolbar = ({ label, onNavigate, onView }) => {
    const isViewActive = (view) => onView(view) === view;

    const [current, setCurrent] = useState("month");

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <div className='contain-btn' onClick={() => onNavigate('TODAY')}>
                    <button className='today-button'>Today</button>
                </div>
                <div className='left-arrow' onClick={() => onNavigate('PREV')}>
                    <NavigateBeforeIcon />
                </div>
                <div className='left-arrow' onClick={() => onNavigate('NEXT')}>
                    <NavigateNextIcon />
                </div>

            </span>
            <span className="rbc-toolbar-label">{label}</span>
            <span className="rbc-btn-group">
                <div className='contain-btn' onClick={() => onNavigate('TODAY')}>
                    <button type="button" onClick={() => { onView('month'); setCurrent('month') }} className={current === "month" ? 'rbc-active' : "other"}>
                        Month
                    </button>
                </div>
                <div className='contain-btn' onClick={() => onNavigate('TODAY')}>
                    <button type="button" onClick={() => { onView('week'); setCurrent('week') }} className={current === "week" ? 'rbc-active' : "other"}>
                        Week
                    </button>
                </div>
                <div className='contain-btn' onClick={() => onNavigate('TODAY')}>
                    <button type="button" onClick={() => { onView('day'); setCurrent('day') }} className={current === "day" ? 'rbc-active' : "other"}>
                        Day
                    </button>
                </div>
                <div className='contain-btn' onClick={() => onNavigate('TODAY')}>
                <button type="button" onClick={() => { onView('agenda'); setCurrent('agenda') }} className={current === "agenda" ? 'rbc-active' : "other"}>
                    Agenda
                </button>
                </div>

        

            </span>
        </div>
    );
};

export default CustomToolbar;
