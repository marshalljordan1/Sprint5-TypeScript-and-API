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

const mainBlobsArray = ['blob-1', 'blob-2', 'blob-3', 'blob-4', 'blob-5'];

// Function to fetch a joke and handle voting
function nextJoke() {
  const jokeBox = document.querySelector('.joke-box');
    const randomBlob = mainBlobsArray[Math.floor(Math.random() * mainBlobsArray.length)];
    jokeBox.classList.remove(...mainBlobsArray);
    jokeBox.classList.add(randomBlob);

    for (let i = 0; i < rateButtons.length; i++) {
      rateButtons[i].style.display = 'block';
    }
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

        // Create a new joke object with a score of 0 and the current date in an ISO string if current API === 1 
        .then(data => {

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

// Add event listener to the show rateButtons when first joke is revealed 

  
fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=0db72ac48dddd8406450bfa9aba40aaf', {
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const iconCode = data.weather[0].icon;
  const weatherIcon = document.getElementById("weather-icon");
  const kelvinTemp = data.main.temp;
  const temperatureElement = document.getElementById("degrees");
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
  const celsiusTemp = Math.floor(kelvinTemp - 273.15);
  temperatureElement.innerText = `${celsiusTemp}°C`;
})

