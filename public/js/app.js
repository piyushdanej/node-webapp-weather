console.log("COming from app.js file")

// fetch("http://puzzle.mead.io/puzzle").then(response =>{
//     response.json().then(data=>{
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


// message1.textContent =  ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cityValue = document.getElementById('city').value;
    const countryValue = document.getElementById('country').value;
    const windSpeed = document.getElementById('wind-speed')


    console.log("city:" +cityValue)
    console.log("country :"  + JSON.stringify(countryValue));
    if (countryValue=="" || cityValue=="") {
        console.log("Plese enter both the values");

    }
    else {
        const url = "/weather?city=" + cityValue + "&country=" + countryValue
        fetch(url)
            .then(response => {
                console.log("response : " + response.toString());
                response.json().then(data => {
                    if (data.error) {
                        console.log(data.error)
                        message1.textContent = data.error;
                    }
                    else{
                        console.log(data);
                        message1.textContent ="Location is : " + data.City
                        message2.textContent ="Summary for it : "+ data.Summary
                        windSpeed.textContent ="Wind speed is about : "+ data.windSpeed

                    }
                })
            });
    }
    console.log('testing');
})