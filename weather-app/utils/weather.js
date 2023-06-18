import axios from "axios"

const getWeather = ({latitude = '', longitude = ''}, callback) => {
    if(!latitude || !longitude) {
        callback(undefined, 'You need to provide search term')
        return
    }

    const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_TOKEN}&query=${latitude},${longitude}`
    axios.get(weatherUrl).then(function ({data}) {
        const { error, current } = data
        if(error) {
            callback(undefined, error.info)
        } else {
            const { temperature, feelslike, weather_descriptions } = current
            if(typeof callback === 'function') {
                callback({
                    weather_descriptions: weather_descriptions[0],
                    temperature,
                    feelslike
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