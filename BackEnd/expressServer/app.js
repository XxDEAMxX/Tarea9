const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();
const LOCAL_HOST = "localhost";

server.use(express.json());
server.use(cors());

server.get('/fetch-data', async (req, res) => {
  try {
    // Llamada a la API de LinkedIn para obtener los datos del perfil
    const linkedinProfile = await axios.get('https://linkedin-profile-data.p.rapidapi.com/linkedin-data?url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fwilliamhgates', {
      headers: {
        'x-rapidapi-host': 'linkedin-profile-data.p.rapidapi.com',
        'x-rapidapi-key': 'f96426f9e4msh72464f506c312efp14416ejsne813336850ff'
      }
    });

    const { full_name: nombreCompleto, summary: resumen, profile_pic_url: fotoPerfil } = linkedinProfile.data;

    // Llamada a la API yesno.wtf para obtener un GIF
    const yesNoGif = await axios.get('https://yesno.wtf/api');
    const { image: gif } = yesNoGif.data;

    const responseObject = {
      nombre: nombreCompleto,
      descripcion: resumen,
      foto: fotoPerfil,
      gifDecision: gif
    };

    res.json(responseObject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ocurrió un problema al consultar las APIs');
  }
});

server.use((req, res, next) => {
  console.log(`Método ${req.method} en la ruta ${req.url} - ${new Date().toLocaleString()}`);
  next();
});

const SERVER_PORT = process.env.PORT || 3000;
server.listen(SERVER_PORT, LOCAL_HOST, () => {
  console.log(`Servidor en funcionamiento en http://${LOCAL_HOST}:${SERVER_PORT}`);
});
