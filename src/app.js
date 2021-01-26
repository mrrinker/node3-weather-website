const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>
{
   res.render('index', {
       title: 'Weather App',
       name: 'Mark Rinker'
   }) 
})

app.get('/about', (req, res) =>
{
   res.render('about',{
        title: 'About me',
        name: 'Mark Rinker'
    })
})

app.get('/help', (req, res) =>
{
   res.render('help',{
        title: 'Help me!',
        name: 'Mark Rinker',
        helpText: 'This is some help text'

    })
})

app.get('/weather', (req, res) => 
{
    if (!req.query.address)
    {
        return res.send({error: 'You must provide an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, detailedLocation} = {}) =>
    {
        if (error)
        {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => 
        {
            if (error)
            {
                return res.send({error: error})                                                                                                                                                                         
            }

            /*
            weather:body.current.weather_descriptions[0],
            temperature:body.current.temperature,
            precipitation:body.current.
            */
            res.send(
                {
                    forecast: forecastData,
                    location: detailedLocation,
                    address: req.query.address
                })
        })    
    })
})

app.get('/products', (req, res) => 
{
    if (!req.query.search)
    {
        return res.send({error: 'You must provide a search term'})
    }

    res.send({products:[]})
})

app.get('/help/*', (req, res) => 
{
    res.render('404',{
        title: 'Resource not found',
        name: 'Mark Rinker',
        errorMessage: 'Please contact customer service to better assist you in your search for help'
    })
})

app.get('*', (req, res) => 
{
    res.render('404',{
        title: 'Help me please!',
        name: 'Mark Rinker',
        errorMessage: 'The resource you have requested does not exist'
    })
})

const port = 3001

app.listen(port, () => 
{
    console.log(`Server is up on ${port}`)
})

