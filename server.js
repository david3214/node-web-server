const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

//app.use uses middleware
app.use((req, res, next)=>{
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFileSync('server.log', log + '\n', err => err ? console.log('Unable to connect to server.log'): console.log() )
    next()
})

/* app.use((req, res, next)=>{
    res.render('maintenance.hbs')
}) */

app.use(express.static(__dirname + '/public'))//__dirname is node-web-server


hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear())

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase()
})

app.get('/', (req, res)=>{
    //res.send(`<h1>Hello Express!</h1>`)
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my home page.'
    })
})
app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})
app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Uable to handle request'
    })
})
app.listen(3000, ()=>{
    console.log('Server up and running on port 3000')
})