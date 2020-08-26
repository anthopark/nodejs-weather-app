const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath= path.join(__dirname, '../templates/partials/')


// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// This will automatically find the match (index.html) from the static folder
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anthony Park'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anthony Park'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anthony Park',
        text: 'Some helpful stuff'
    });
})

app.get('/help/*', (req,res) => {
    res.render('404error',{
        title: '404 Error',
        message: 'Help article not found',
        name: 'Anthony Park'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error });
        } else {
            const location = geoData.location;
            forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                } else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    });
                }

            })
        }
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search);

    res.send({
        products: []
    });
})

// match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('404error',{
        title: '404 Error',
        message: 'Page Not found',
        name: 'Anthony Park'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});