const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
.options({
  a: {
    demand:true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;


// GET THE LOCATION
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  //NO ERRORS ----
  } else {
    console.log(`\n------ ${results.address} ------`);

    // GET THE WEATHER ----
    weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Currently: ${weatherResults.realTemp}\nReal Feel: ${weatherResults.feelsLike}`);
        console.log(`Today's chance of rain: ${Math.floor(weatherResults.precipProbability * 100)}%`);
        console.log('-----------------\n')
      }
    });
  }
});
