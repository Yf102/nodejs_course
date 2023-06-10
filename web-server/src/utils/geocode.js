import axios from "axios"

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFyZTE5MiIsImEiOiJjbGlteDc1bzQwdjlmM2VtbWZ1MW1oOWQ5In0.F91cICdQ1lJEZXLvhzZ9pA'
const getGeoCode = (searchTerm, callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${MAPBOX_TOKEN}&limit=1`
    axios.get(mapboxUrl).then(({data}) => {
        const searchResult = data.features[0]
        if(searchResult) {
            const { place_name, center: coordinates } = searchResult
            if(typeof callback === 'function') {
                // Latitude [1]
                // Longitude [0]
                callback({
                    coordinates: {
                        latitude: coordinates[1],
                        longitude: coordinates[0]
                    },
                    place: place_name
                })
            }
        } else {
            if(typeof callback === 'function') {
                callback(undefined, 'We could not find such a place')
            }
        }
    }).catch(function (error) {
        if(typeof callback === 'function') {
            callback(undefined, {msg: 'Unable to connect to mapbox services', error})
        }
    });
}

export default getGeoCode