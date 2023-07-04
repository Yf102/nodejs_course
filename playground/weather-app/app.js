import chalk from "chalk"
import getGeoCode from "./utils/geocode.js"
import getWeather from "./utils/weather.js"
import { printError, printSuccess } from "./utils/printing.js"
import { argv } from "process"

// const searchTerm = 'ul. Bogdan 7, Sofia, Bulgaria'
const searchTerm = argv[2]
if(!searchTerm) {
    console.log(chalk.red.inverse('You need to provide search term'))
} else {
    getGeoCode(searchTerm, (data, error) => {
        printError(error)
        
        if(data) {
            const { coordinates, place } = data
            console.log(chalk.bold(`Weather forcast for: `), chalk.green(place))
            getWeather(coordinates, (data, error) => {
                printError(error)
                printSuccess(data)
            })
        }
    })
}

