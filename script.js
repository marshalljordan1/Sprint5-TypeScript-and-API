// Get HTML elements
const showJoke = document.getElementById("joke");
const rateOne = document.getElementById("rate-one");
const rateTwo = document.getElementById("rate-two");
const rateThree = document.getElementById("rate-three");
const jokeButton = document.getElementById("next-joke");
const rateButtons = document.getElementsByClassName("rate");
const weather = document.getElementById("weather");

// Create an empty array to store joke objects
const reportJokes = [];

// Create an array of APIs to alternate between 
const jokeAPIs = ['https://icanhazdadjoke.com', 'https://api.chucknorris.io/jokes/random'];
let currentAPI = 0;
let jokeObj = {};

// Create an array of class names for the background blobs
const mainBlobsArray = ['blob-1', 'blob-2', 'blob-3', 'blob-4', 'blob-5'];

// Function to fetch a joke and handle voting
function nextJoke() {
  // Select the HTML element with the class "joke-box" and add a random background blob from mainBlobsArray
  const jokeBox = document.querySelector('.joke-box');
    const randomBlob = mainBlobsArray[Math.floor(Math.random() * mainBlobsArray.length)];
    jokeBox.classList.remove(...mainBlobsArray);
    jokeBox.classList.add(randomBlob);

    // Display the rating buttons
    Array.from(rateButtons).forEach(button => {
      button.style.display = 'block';
    });

  // Get the current joke API URL and increment the currentAPI variable
  const apiUrl = jokeAPIs[currentAPI];
  currentAPI = (currentAPI + 1) % jokeAPIs.length;
    // Call the API to get a joke
    fetch(apiUrl, {
        headers: {
          'Accept': 'application/json'
        }
      })
        // Parse the data response as JSON
        .then(response => response.json())
        // Handle the data received
        .then(data => {
          // Create a new joke object with a score of 0 and the current date in an ISO string if current API === 1 
          if (currentAPI === 1) {
            jokeObj = {
              joke: data.joke,
              score: 0,
              date: new Date().toISOString()
            }
          } else if (currentAPI === 0) {
              jokeObj = {
                joke: data.value,
                score: 0,
                date: new Date().toISOString()
              };
            };
          // Display the joke text on screen 
          showJoke.innerText = jokeObj.joke;
          // Change button text to Next Joke
          jokeButton.textContent = "Next Joke";
          // Add event listeners for each rating button 
          rateOne.addEventListener('click', () => {
            jokeObj.score = 1;
          });
          rateTwo.addEventListener('click', () => {
            jokeObj.score = 2;
          });
          rateThree.addEventListener('click', () => {
            jokeObj.score = 3;
          });
          // check if the joke is already in the reportJokes array using findIndex
          const index = reportJokes.findIndex(obj => obj.joke == jokeObj.joke);
          // If it is, update the existing object with the new score
          if (index !== -1) {
            reportJokes[index] = jokeObj;
          } 
          // Otherwise, add the new joke object to the reportJokes array
          else {
            reportJokes.push(jokeObj);
          }
          console.log(reportJokes);
          // Log the contents of the reportJokes array to the console 
        })
        // Handle any errors
        .catch(error => console.error(error));
      };

// Fetch the weather data for Barcelona from the OpenWeatherMap API using the provided URL and API key  
fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=0db72ac48dddd8406450bfa9aba40aaf', {
// Set the headers to indicate that the response should be in JSON format  
headers: {
    'Accept': 'application/json'
  }
})
// Parse the response data as JSON
.then(response => response.json())
// Handle the data received
.then(data => {
  // Get the weather icon code from the data received
  const iconCode = data.weather[0].icon;
  // Get the HTML element for the weather icon
  const weatherIcon = document.getElementById("weather-icon");
  // Get the temperature in Kelvin from the data received
  const kelvinTemp = data.main.temp;
  // Get the HTML element for the temperature
  const temperatureElement = document.getElementById("degrees");
  // Create the URL for the weather icon image using the icon code
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  // Set the HTML inside the weather icon element to display the weather icon image
  weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
  // Convert the temperature from Kelvin to Celsius and round down to the nearest integer
  const celsiusTemp = Math.floor(kelvinTemp - 273.15);
  // Set the HTML inside the temperature element to display the temperature in Celsius
  temperatureElement.innerText = `${celsiusTemp}°C`;
})

