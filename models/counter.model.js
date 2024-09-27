const mongoose = require('../config/db.config');

const counterSchema = new mongoose.Schema({
    id: { type: String, required: true },
    seq: { type: Number, default: 0 },
    kilos: { type: Number, required: true },
    totalCompra: { type: Number, required: true } 
});

module.exports = mongoose.model('Counter', counterSchema);
