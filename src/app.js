const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()

// Define paths for Express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Define handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve 
app.use(express.static(publicPathDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App!!',
        name: 'Krishnapriya Parumanchala'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name : 'Krishnapriya Parumanchala'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Krishnapriya Parumanchala'
    })
})


app.get('' , (req, res) => {
    res.send('<h1> Hello Express!!! </h1>')
})
// app.get('/help',(req, res) => {
//     res.send([
//     {
//         name: 'Krishnapriya'
//     },
//     {
//     name: 'Bharath Gandham'
//     }
// ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h2> This page is all about Express!</h2>')
// })

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Address must be provided!!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
                
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     forecast: "It's 40 degrees outside",
    //     location: 'Houston',
    //     address: req.query.address
    // })
})
//app.com
//app.com/about
//app.com/help

app.get('/products', (req,res) => {

    if(!req.query.search){
         return res.send({
           error: "You must provide 'search' term!!"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Krishnapriya Parumanchala',
        errorMessage: 'Help article not found!'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Krishnapriya Parumanchala',
        errorMessage:'Article not found!!'
    })
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000!')
})

