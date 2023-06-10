import chalk from "chalk";
const printError = (error) => {
    if(!error) return

    if(typeof error === 'object') {
        console.log(chalk.red.inverse(error.msg), chalk.red(error.error))
    } else {
        console.log(chalk.red.inverse(error))
    }
    return error
}

const printSuccess = (msg) => {
    if(msg) {
        console.log(
            chalk.green.inverse(
                `${msg.weather_descriptions}. It is currently ${msg.temperature} degrees out. It feels like ${msg.feelslike} degrees out.`
            )
        )
    }
    return msg
}

export {
    printError,
    printSuccess
}