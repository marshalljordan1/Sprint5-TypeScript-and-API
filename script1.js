const showJoke = document.getElementById("joke");
const rateOne = document.getElementById("rate-one");
const rateTwo = document.getElementById("rate-two");
const rateThree = document.getElementById("rate-three");
const jokeButton = document.getElementById("next-joke");
const rateButtons = document.getElementsByClassName("rate")


const reportJokes = [];

function nextJoke() {
    fetch('https://icanhazdadjoke.com', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const jokeObj = {
            joke: data.joke,
            score: 0,
            date: new Date().toISOString()
        };
        showJoke.innerText = jokeObj.joke;
        rateOne.addEventListener('click', () => {
            jokeObj.score = 1;
        });
        rateTwo.addEventListener('click', () => {
            jokeObj.score = 2;
        });
        rateThree.addEventListener('click', () => {
            jokeObj.score = 3;
        });
    })
}