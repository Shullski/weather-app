const yargs = require('yargs');
const axios = require('axios');
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

var encodedAddress = encodeURIComponent(argv.address);
var API_KEY = '&key=AIzaSyBnuVEIVLrVrSmqlHx_D3NFTfdWHleI2hY';

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress + API_KEY}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat
      lng = response.data.results[0].geometry.location.lng,
      address = response.data.results[0].formatted_address,
      weatherURL = `https://api.darksky.net/forecast/fa97a133a3fc85a9f18391838a7bb33a/${lat},${lng}`;

  return axios.get(weatherURL);

}).then((response) => {
  var temperature = response.data.currently.temperature;
  var feelsLike = response.data.currently.apparentTemperature;
  console.log(`\n${address}\n--------`);
  console.log(`It's currently ${temperature}. It feels like ${feelsLike}.`)
  console.log('--------\n')

}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
