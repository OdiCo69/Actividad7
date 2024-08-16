const express = require('express');
const moment = require('moment-timezone');
const app = express();
const puerto = 9000;

// Listado de zonas horarias válidas para verificación
const zonasHorariasValidas = moment.tz.names();

app.get('/hora/:ciudad', (req, res) => {
    const ciudad = req.params.ciudad;

    // Verificar si la ciudad proporcionada es una zona horaria válida
    if (!zonasHorariasValidas.includes(ciudad)) {
        return res.status(400).send(`La ciudad o zona horaria '${ciudad}' no es válida.`);
    }

    const hora = moment().tz(ciudad).format('HH:mm:ss');
    res.send(`La hora actual en ${ciudad} es ${hora}`);
});

app.get('/hora/', (req, res) => {
    const ciudades = ['America/Bogota', 'Asia/Singapore', 'Africa/Johannesburg', 'Australia/Sydney'];
    const datosHora = ciudades.map(ciudad => {
        const hora = moment().tz(ciudad).format('HH:mm:ss');
        return { ciudad, hora };
    });

    res.json(datosHora);  // Devolver datos en formato JSON
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
