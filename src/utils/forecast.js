const request = require("postman-request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c83cc96b72cee2e7a1550b35b42e2386&query=${lat},${long}&units=f`;
    request({ url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const forecastData = body.current;
            callback(undefined, forecastData)
        }
    });
}

module.exports = forecast;