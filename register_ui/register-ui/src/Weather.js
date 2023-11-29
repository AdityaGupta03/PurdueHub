

//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}

import React, { useEffect, useState } from 'react'
import './weather.css'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'

import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const fetchCurrentWeather = async () => {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=West Lafayette&units=imperial&appid=1e703121f70e7e6e31b49f3089206244'
    );
    const data = await response.json();
    return data;
  };
  
  const fetchWeatherForecast = async () => {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=West Lafayette&units=imperial&appid=1e703121f70e7e6e31b49f3089206244'
    );
    const data = await response.json();
    return data;
  };

const Weather = () => {

    // "https://api.openweathermap.org/data/2.5/weather?q=West Lafayette&units=imperial&appid=1e703121f70e7e6e31b49f3089206244"
    // https://api.openweathermap.org/data/2.5/forecast?q=West Lafayette&units=metric&appid=1e703121f70e7e6e31b49f3089206244"
    
    const { data: currentWeather, error: currentWeatherError, isLoading: currentWeatherLoading } = useQuery(
        'currentWeather',
        fetchCurrentWeather
      );
    
      const { data: weatherForecast, error: forecastError, isLoading: forecastLoading } = useQuery(
        'weatherForecast',
        fetchWeatherForecast
      );
    
      if (currentWeatherLoading || forecastLoading) {
        return <p>Loading...</p>;
      }
    
      if (currentWeatherError || forecastError) {
        return (
          <p>
            Error: {currentWeatherError && currentWeatherError.message}{' '}
            {forecastError && forecastError.message}
          </p>
        );
      }

  return (
    <div className='whole' style={{color:'whitesmoke'}}>
        <h1 className='test'>Weather In West Lafayette</h1>
      <CurrentWeather data={currentWeather}/>
      <Forecast data={weatherForecast}/>
    </div>
  )
}

export default Weather