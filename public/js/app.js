
console.log('client side js is loaded');





const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_one');
const messageTwo = document.querySelector('#message_two');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    messageTwo.textContent='';
    messageOne.textContent = "Loading...";
    let address = search.value;
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent='';
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
    console.log('testing..!')
})

