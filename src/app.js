const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engin and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static diorectory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Noel'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Noel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Noel',
        message: 'How can I help you?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You much provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if(error) {
             return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastdata) => {
    
            if(error) {
                return res.send({error})
           }
            return res.send({
            location,
            forecast: forecastdata,
            address: req.query.address
        })
    })
})


    // res.send({
    //     forecast: "Its  is cloudy",
    //     location: "Philadelphia",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You much provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Noel',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Noel',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})