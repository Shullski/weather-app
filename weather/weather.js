const request = require('request');

//fa97a133a3fc85a9f18391838a7bb33a
var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/fa97a133a3fc85a9f18391838a7bb33a/${lat},${lng}`,
    json:true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        feelsLike: body.currently.apparentTemperature,
        realTemp: body.currently.temperature,
        precipProbability: body.daily.data[0].precipProbability
      })
    } else {
      callback('Unable to fetch the weather.');
    }
  });
}

module.exports = {
  getWeather
};
