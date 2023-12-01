import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './filter-courses.css';
import './filterCourses.scss'
const FilterCourses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == 'false') {
     navigate('/login');
    }
  }, []);

  async function fetchCourses() {
    const selectedSubject = document.getElementById('subject').value;
    let classNumberOrInterval = document.getElementById('classNumber').value;
    const courseName = document.getElementById('courseName').value.toLowerCase();

    // Check if a subject is selected
    if (!selectedSubject) {
      alert('Please select a subject filter.');
      return;
    }

    // Handle the case where a shorter class number is entered (e.g., 180 instead of 18000)
    if (classNumberOrInterval && !classNumberOrInterval.includes('-')) {
      classNumberOrInterval = padClassNumber(classNumberOrInterval);
    }

    // Build the filter based on subject, class number or interval, and course name
    let filter = `Subject/Abbreviation eq '${selectedSubject}'`;
    if (classNumberOrInterval) {
      if (classNumberOrInterval.includes('-')) {
        // If it's an interval (e.g., 100-200)
        const [start, end] = classNumberOrInterval.split('-');
        filter += ` and Number ge '${padClassNumber(start)}' and Number le '${padClassNumber(end)}'`;
      } else {
        // If it's a single class number
        filter += ` and Number eq '${padClassNumber(classNumberOrInterval)}'`;
      }
    }

    // Fetch data from the API
    await fetch(`https://api.purdue.io/odata/Courses?$filter=${filter}&$orderby=Number%20asc`)
      .then(response => response.json())
      .then(data => {
        // Filter data by course name
        const filteredData = courseName
          ? data.value.filter(course => course.Title.toLowerCase().includes(courseName))
          : data.value;

        // Display data in boxes or show a message if no data is found
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = ''; // Clear previous content

        if (filteredData.length > 0) {
          filteredData.forEach(course => {
            const courseBox = document.createElement('div');
            courseBox.className = 'course-box';

            const courseTitle = document.createElement('h3');
            courseTitle.textContent = ` ${course.Number}`;

            const creditHours = document.createElement('p');
            creditHours.className = 'credit-hours';
            creditHours.textContent = `Credit Hours: ${course.CreditHours}`;

            const courseDescription = document.createElement('p');
            courseDescription.textContent = course.Title;

            courseBox.appendChild(courseTitle);
            courseBox.appendChild(creditHours);
            courseBox.appendChild(courseDescription);

            coursesContainer.appendChild(courseBox);
          });
        } else {
          //const noClassesMessage = document.createElement('p');
          //noClassesMessage.textContent = 'No classes found!';

          //const courseContain = document.createElement('div');
          //courseContain.className = 'courseContain';

          const courseBox = document.createElement('div');
          courseBox.className = 'course-box err';

          const courseTitle = document.createElement('h3');
          courseTitle.textContent = "Error";

          const creditHours = document.createElement('p');
          creditHours.className = 'credit-hours';
          creditHours.textContent = "Error";

          const courseDescription = document.createElement('p');
          courseDescription.textContent = "No Classes Found";

          courseBox.appendChild(courseTitle);
          courseBox.appendChild(creditHours);
          courseBox.appendChild(courseDescription);

          coursesContainer.appendChild(courseBox);

          //courseContain.appendChild(coursesContainer)
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function padClassNumber(number) {
    // Pad the class number with zeros to match the expected format (e.g., 18000)
    const paddedNumber = '0000' + number;
    return paddedNumber.slice(-5);
  }

  return (
    <div className="container-of">

      <div className="top-wrapper">
        <div className="subject-wrapper">

          <label for="subject">Select Subject:</label> 
          <select id="subject">
            <option value="">Select Subject</option>
            <option value="CS">Computer Science (CS)</option>
            <option value="CHM">Chemistry (CHM)</option>
          </select>

        </div>

        <div className="class-num-wrapper">
          <label for="classNumber">Enter Class Number or Interval:</label>
          <input type="text" id="classNumber" placeholder="Class Number or Interval" />
        </div>

        <div className="search-course-wrapper">
          <label for="courseName">Search by Course Name:</label>
          <input type="text" id="courseName" placeholder="Course Name" />
        </div>

        <div className="button-wrapper">
        <button onClick={fetchCourses}>Fetch Courses</button>

        </div>
      </div>

      <div id="courses-container" class="courses-container"></div>
    </div>
  )
}

export default FilterCourses;