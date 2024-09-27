const express = require('express');
const bodyParser = require('body-parser');
const coffeeRoutes = require('./routes/coffee.routes');
require('./config/db.config');

const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/coffees', coffeeRoutes);
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
