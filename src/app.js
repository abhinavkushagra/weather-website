const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather",
        author : "Abhinav Kushagra"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About",
        author : "Abhinav Kushagra"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : "Help",
        site : "https://www.google.co.in",
        author : "Abhinav Kushagra"
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title : "Error 404",
        message : "Help Article Not Found!",
        author : "Abhinav Kushagra"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            Error: "Please provide an address to search!"
        })
    }
    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if (error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send(error)
            console.log(forecastData.icon)
            res.send({
                icon: forecastData.icon,
                forecast : forecastData.forecast,
                location: place,
                address : address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title : "Error 404",
        message : "Page Not Found!",
        author : "Abhinav Kushagra"
    })
})

app.listen(PORT, () => {
    console.log("Server is up at port " + PORT)
})