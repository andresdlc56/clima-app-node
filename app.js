const lugar = require('./lugar/lugar');

//Configurando un comando en yargs
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

//console.log(argv.direccion);
lugar.getLugarLatLng(argv.direccion)
    .then(console.log);

//Obteniendo las condiciones del clima en un lugar especifico
//Promesa
/*
clima.getClima(40.42882, -3.64539)
    .then(console.log)
    .catch(console.log)
*/

//Invocando funcion
lugar.getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log)