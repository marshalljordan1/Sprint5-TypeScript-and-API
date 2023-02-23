
const showJoke = document.getElementById("joke");

function nextJoke() {
    fetch('https://icanhazdadjoke.com', {
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => showJoke.innerText = data.joke)
        .catch(error => console.error(error));
};

