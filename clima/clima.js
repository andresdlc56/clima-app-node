//Para hacer las peticiones a la api
const axios = require('axios');

//Definiendo funcion para obtner el clima
let getClima = async(lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=57b6dc9b31f0a6470c72b9a8d9d68158&units=metric`)
    return resp.data.main.temp;
}

//Exportando
module.exports = {
    getClima
}