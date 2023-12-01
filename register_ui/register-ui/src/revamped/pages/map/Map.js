import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Map.css';
import './Map.scss'
const Map = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  let temp = 0;

  useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'false') {
        navigate('/login');
      }
    try {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAJjTUM6jgVKmk-FGrB8FRgV1rArfnfUDo&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      setTimeout(() => {
        initMap();
      }, 2000);

      return () => {
        document.head.removeChild(script);
      };
    } catch {
      console.log("error");
    }

    // if (temp == 0) {
    //   window.location.reload();
    //   temp = 1;
    // }

  }, []);

  function initMap() {
    try {
      const loadMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.4237, lng: -86.9212 },
        zoom: 14,
      });
      setMap(loadMap);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            loadMap.setCenter(userLocation);

            setUserMarker(new window.google.maps.Marker({
              position: userLocation,
              map: loadMap,
              title: 'Your Location',
            }));
            // const userMarker = new window.google.maps.Marker({
            //   position: userLocation,
            //   map: loadMap,
            //   title: 'Your Location',
            // })
          },
          () => {
            console.error('Error: The Geolocation service failed.');
          }
        );
      } else {
        console.error('Error: Your browser doesn\'t support geolocation.');
      }

      addCustomMarker({ lat: 10, lng: 10 }, 'Marker 1');
      addCustomMarker({ lat: -10, lng: -10 }, 'Marker 2');

      const data = [
        { event_name: 'Event 1', location: 'WALC, Purdue University' },
        { event_name: 'Event 2', location: 'Corec, Purdue University' },
      ];

      const { eventNames, locations } = parseEventData(data);

      console.log('Event Names:', eventNames);
      console.log('Locations:', locations);

      const geocoder = new window.google.maps.Geocoder();
      let index = 0;
      locations.forEach(function (location) {
        geocoder.geocode({ 'address': location }, function (results, status) {
          if (status === 'OK') {
            const marker = new window.google.maps.Marker({
              map: loadMap,
              position: results[0].geometry.location,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            });
            addInfoWindow(marker, eventNames[index]);
            console.log(index);
            index++;
          } else {
            console.error('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  function parseEventData(data) {
    const eventNames = data.map(entry => entry.event_name);
    const locations = data.map(entry => entry.location);

    return { eventNames, locations };
  }

  function addInfoWindow(marker, text) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: text,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }

  function addCustomMarker(position, title) {
    new window.google.maps.Marker({
      position: position,
      map: map,
      title: title,
    });
  }

  function getDirections() {
    const destinationInput = document.getElementById('destination-input');
    const destinationName = destinationInput.value;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({ map: map });

    directionsService.route(
      {
        origin: userMarker.getPosition(),
        destination: destinationName,
        travelMode: 'WALKING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  }

  function searchLocation() {
    const locationInput = document.getElementById('location-input');
    const locationName = locationInput.value;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, function (results, status) {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(13);

        const searchMarker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: locationName,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        });

        addInfoWindow(searchMarker, locationName);
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  return (
    <div className="container-overall">
      <div className="search-bar">
        <div className="input-wrapper-1">
          <input type="text" id="location-input" placeholder="Enter location" />
          <button onClick={searchLocation}>Search</button>
        </div>

        <div className="input-wrapper-2">
          <input type="text" id="destination-input" placeholder="Enter destination" />
          <button onClick={getDirections}>Get Directions</button>
        </div>


      </div>
      <div id="map" className="map"></div>
    </div>
  );
}

export default Map;
