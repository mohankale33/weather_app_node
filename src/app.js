const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCodeUtils = require('./utils/geoCode');
const forecastUtils = require('./utils/forecast');

const app = express();

// Define path for Express Confige
const PublicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(PublicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohan Kale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mohan Kale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpfull Text..!',
        name: 'Mohan Kale'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address..!'
        })
    }
    geoCodeUtils.geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecastUtils.forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        Address: `${req.query.address}`
                    })
                }
            })
        }
    })


    
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search terms..!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Mohan Kale',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohan Kale',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000...!')
})

