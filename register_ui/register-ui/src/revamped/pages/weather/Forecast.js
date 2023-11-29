import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.scss";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  //
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <span className="day">{forecastDays[idx]}</span>
                  <span className="description">{item.weather[0].description}</span>
                  <span className="min-max">{Math.round(item.main.temp_max)}°F /{Math.round(item.main.temp_min)}°F</span>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <span>Pressure:</span>
                  <span>{item.main.pressure}</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Humidity:</span>
                  <span>{item.main.humidity}</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Clouds:</span>
                  <span>{item.clouds.all}%</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Wind speed:</span>
                  <span>{item.wind.speed} m/s</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Sea level:</span>
                  <span>{item.main.sea_level}m</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Feels like:</span>
                  <span>{item.main.feels_like}°F</span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;