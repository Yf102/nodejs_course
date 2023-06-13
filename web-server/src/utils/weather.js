import axios from "axios"

const WEATHER_TOKEN = '7ec10819718beeedce2355a026f26d7e'

const getWeather = ({latitude = '', longitude = ''}, callback) => {
    if(!latitude || !longitude) {
        callback(undefined, 'You need to provide search term')
        return
    }

    const weatherUrl = `http://api.weatherstack.com/current?access_key=${WEATHER_TOKEN}&query=${latitude},${longitude}`
    axios.get(weatherUrl).then(({data}) => {
        const { error, current } = data
        if(error) {
            callback(undefined, error.info)
        } else {
            const { temperature, feelslike, weather_descriptions, humidity } = current
            if(typeof callback === 'function') {
                console.log('Callback in weather')
                callback({
                    weather_descriptions: weather_descriptions[0],
                    temperature,
                    feelslike,
                    humidity
                })
            }
        }
    }).catch(function (error) {
        if(typeof callback === 'function') {
            callback(undefined, {msg: 'Unable to connect to mapbox services', error})
        }
    });
}

export default getWeather