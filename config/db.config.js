const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/coffeebuy'; 

mongoose.connect(dbURI, )
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

module.exports = mongoose;
