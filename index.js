
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box') ;
const weatherDetails = document.querySelector('.weather-details'); 
const error404 = document.querySelector('.not-found') ;


search.addEventListener(
    'click', () => {// for targets like element, document, window
    //when 'click'   -> create and call the function 
    const APIKey = "0293a0ff1be19bca24ad7c40b6cf1d4e";
    const city = document.querySelector('.search-box input').value; 

    if(city === '')
        return; 

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => { // In javascript, 有placeholder(variable) 嘅string, use backtick instead of a single quotation for a string 
            
            //action on the data 
            if (json.cod === "404"){
                container.style.height = "400px";
                weatherBox.style.display = "none"; //won't show the .weatherBox class 
                weatherDetails.style.display = "none";   //won't show the .weatherDetails class 
                error404.style.display = "block";
                error404.classList.add("fadeIn");
                return; 
            }

            error404.style.display = "none" ; //won't show the .non-found class 
            error404.classList.remove("fadeIn");
            

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            

            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default: 
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML =  `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; 

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '650px';

        
    });
      // fetch('<link>').then(<response_object> => <response.json 
        // return a promise that resolves with a Response object  (第一個then)
        // This response object doe not have a JSON body, but has a representatioin of entire HTML response      // so we use a json() method to extract the json body, return the second promise (第二個then) that resolves with the result of parsing the response body text as JSON 
});