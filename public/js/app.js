const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            messageTwo.textContent = '';
            messageOne.textContent = 'Loading...';

            console.log(data);
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.forecast);
                messageOne.textContent = `It feels like ${data.forecast.feelslike} degree`;
                console.log(data.location);
                messageTwo.textContent = data.location;
            }
        })
    })
});