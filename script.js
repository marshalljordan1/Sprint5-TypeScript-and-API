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

// Function to fetch a joke and handle voting
function nextJoke() {
    // Call the API to get a joke
    fetch('https://icanhazdadjoke.com', {
        headers: {
          'Accept': 'application/json'
        }
      })
        // Parse the data response as JSON
        .then(response => response.json())
        // Handle the data received
        .then(data => {
          // create a new joke object with a score of 0 and the current date in an ISO string
          const jokeObj = {
            joke: data.joke,
            score: 0,
            date: new Date().toISOString()
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
          // Log the contents of the reportJokes array to the console 
          console.log(reportJokes)
        })
        // Handle any errors
        .catch(error => console.error(error));
      };

// Add event listener to the show rateButtons when first joke is revealed 
jokeButton.addEventListener('click', function() {
    for (let i = 0; i < rateButtons.length; i++) {
      rateButtons[i].style.display = 'block';
    }
});
  
fetch('https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=0db72ac48dddd8406450bfa9aba40aaf', {
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const kelvinTemp = data.main.temp;
  const celsiusTemp = Math.floor(kelvinTemp - 273.15);
  weather.innerText = `${celsiusTemp}°C`;
});
