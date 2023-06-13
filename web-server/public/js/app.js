const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const address_msg = document.getElementById('address_msg')
const weather_descriptions = document.getElementById('weather_descriptions')
const error_p = document.getElementById('error-p')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    error_p.textContent = ''
    address_msg.textContent = 'Loading...'
    weather_descriptions.textContent = ''

    fetch(`/weather?address=${search.value}`)
        .then((resp) => {
            resp.json().then((data) => {
                address_msg.textContent = ''
                if(data.error) {
                    error_p.textContent = data.error
                } else {
                    const { address, forecast } = data
                    const { feelslike, temperature, weather_descriptions: wd, humidity } = forecast

                    address_msg.textContent = address
                    weather_descriptions.innerHTML =
                        `<br /> ${wd}. <br />
                        It is currently ${temperature} degrees out. <br />
                        It feels like ${feelslike} degrees out. <br />
                        Humidity is: ${humidity}`
                }
            })
        })
})