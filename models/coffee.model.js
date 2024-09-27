const mongoose = require('../config/db.config');

const coffeeSchema = new mongoose.Schema({
    idCompra: { type: Number, unique: true },
    nombreCliente: { type: String, required: true },
    nombreFinca: { type: String, required: true },
    peso: { type: Number, required: true, min: 1, max: 125 },
    precioKilo: { type: Number, required: true, min: 1000, max: 5000 },
    fecha: { type: Date, default: Date.now },
    valorTotal: { type: Number }
});

module.exports = mongoose.model('Coffee', coffeeSchema);

