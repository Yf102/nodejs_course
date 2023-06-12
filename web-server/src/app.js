import express from 'express'
import getGeoCode from "./utils/geocode.js";
import getWeather from "./utils/weather.js";

import path from 'path';
import {fileURLToPath} from 'url';
import hbs from 'hbs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicPath, { extensions: ['html'] }))

app.get('', (req, res) =>
    res.render('index', {
        title: 'Weather',
        name: 'Filip'
    })
)

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Filip'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help message you asked for',
        name: 'Filip Hristov'
    })
})

app.get('/weather', (req, res) => {
    const { address: searchTerm } = req.query
    if(!searchTerm) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    getGeoCode(searchTerm, ({ coordinates, place } = {}, error) => {
        if(error) {
            return res.send({ error })
        }

        if(coordinates) {
            getWeather(coordinates, (data, error) => {
                if(error) {
                    return res.send({ error })
                }
                res.send({ forecast: data, address: place })
            })
        }
    })
})

app.get('/products', (req, res) => {
    console.log('query', req.query)

    if(!req.query.search) {
        return res.send({
            error: 'You must provide search!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        msg: 'Help article doesnt exists',
        name: 'Filip Hristov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: '404 page',
        name: 'Filip Hristov'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})