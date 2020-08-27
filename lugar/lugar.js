const axios = require('axios');

//Importando funcion para el clima 
const { getClima } = require('../clima/clima');

const getLugarLatLng = async(dir) => {
    const instance = axios.create({
        baseURL: `https://geocode.xyz/?locate=location?city=${ dir }&auth=455233098707938474798x127382 &json=1`
            /*
             headers: {
                 'locate': 'location?city=Madrid,Spain',
                 'auth': '455233098707938474798x127382 ',
                 json: 1
             }
             */
    });

    const resp = await instance.get();

    if (Object.keys(resp.data).length === 0) {
        throw new Error(`No hay resultados para ${ dir }`);
    }

    const data = resp.data;

    const direccion = data.standard.city
    const lat = data.latt;
    const lng = data.longt;

    return {
        direccion,
        lat,
        lng
    }
}

//Definiendo funcion para retornar la informacion de un lugar especificado por el usuario
let getInfo = async(dir) => {
    //Si to sale bien
    try {
        //Obteniendo los datos del lugar que buscamos
        let coords = await getLugarLatLng(dir);

        //Obteniendo los datos climatologicos del lugar que buscamos 
        let tempLugar = await getClima(coords.lat, coords.lng);

        return `el clima de ${ coords.direccion } es de ${ tempLugar }° Centigrados`;
    }
    //Si algo sale mal
    catch (e) {
        return `No se pudo determinar el clima de ${ dir }`
    }

    //Salida 
    //el clima de xxxxxxx es de xxxx temperaduta
    //En caso de que no se pueda determinar el clima del lugar buscado
    //Decir: No se pudo determinar el clima de xxxxx 
}

module.exports = {
    getLugarLatLng,
    getInfo
}