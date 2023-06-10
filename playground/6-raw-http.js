import http from 'http'

const weatherUrl = `http://api.weatherstack.com/current?access_key=7ec10819718beeedce2355a026f26d7e&query=40,-75`
const request = http.request(weatherUrl, (resp) => {
    let data = ''
    resp.on('data', (chunk) => {
        data += chunk.toString()
    })

    resp.on('end', () => {
        console.log(JSON.parse(data))
    })
})

request.on('error', (error) => {
    console.error(error)
})

request.end()