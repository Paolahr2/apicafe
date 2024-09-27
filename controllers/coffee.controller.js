const Coffee = require('../models/coffee.model');
//const Counter = require('../models/counter.model');

// Esta función sirve para obtener el próximo valor de ID autoincremental
const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
};

// Crear una compra
exports.create = async (req, res) => {
    try {
        const coffee = new Coffee(req.body);
        coffee.idCompra = await getNextSequenceValue('idCompra');


        const precioFinal = coffee.precioKilo < 2000 ? 2000 : coffee.precioKilo;
        coffee.valorTotal = precioFinal * coffee.peso;

        const savedCoffee = await coffee.save();
        res.status(201).json(savedCoffee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todas las compras
exports.list = async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.status(200).json(coffees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una compra
exports.update = async (req, res) => {
    try {
        const updatedCoffee = await Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoffee) return res.status(404).json({ message: 'Compra no encontrada 1' });
        res.status(200).json(updatedCoffee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una compra
exports.delete = async (req, res) => {
    try {
        const deletedCoffee = await Coffee.findByIdAndDelete(req.params.id);
        if (!deletedCoffee) return res.status(404).json({ message: 'Compra no encontrada 2' });
        res.status(200).json({ message: 'Compra eliminada con éxito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Consultar el valor total a pagar por una compra
exports.consultarValorPagar = async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);
        if (!coffee) return res.status(404).json({ message: 'Compra no encontrada 3' });
        res.status(200).json({ valorTotal: coffee.valorTotal });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//Controlador para obtener clientes por id

exports.findByClientName = async (req, res) => {
    try {
        const coffee = await Coffee.findOne({ nombreCliente: req.params.nombreCliente });
        if (!coffee) return res.status(404).json({ message: 'Compra no encontrada 4' });
        res.status(200).json(coffee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controlador para consultar una compra por ID
exports.findById = async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);

        if (!coffee) {
            return res.status(404).json({ message: 'Compra no encontrada 5' });
        }

        res.status(200).json(coffee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.convertToDollars = async (req, res) => {
    const tasaCambio = 4200;
    try {
        const coffee = await Coffee.findOne({ idCompra: req.params.idCompra });

        if (!coffee) {
            return res.status(404).json({ message: 'Compra no encontrada 6' });
        }


        const precioKiloDolar = coffee.precioKilo / tasaCambio;

        res.status(200).json({
            idCompra: coffee.idCompra,
            nombreCliente: coffee.nombreCliente,
            precioKilo: coffee.precioKilo,
            precioKiloDolar: precioKiloDolar.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Contar compras


exports.contarCompras = async (req, res) => {
    console.log("entrando al controlador contar compras");

    try {
        const totalCompras = await Coffee.countDocuments();
        res.status(200).json({
            totalCompras: totalCompras
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.sumarKilos = async (req, res) => {
    console.log("Entrando al controlador para sumar kilos de compras");

    try {

        const totalKilos = await Coffee.aggregate([
            {
                $group: {
                    _id: null,
                    totalKilos: { $sum: "$peso" }
                }
            }
            
        ]);

        res.status(200).json({
            totalKilos: totalKilos.length > 0 ? totalKilos[0].totalKilos : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.sumarTotalCompras = async (req, res) => {
    console.log("Entrando al controlador para sumar el total de las compras");

    try {
        const totalCompras = await Coffee.aggregate([
            {
                $group: {
                    _id: null,
                    totalCompras: { $sum: "$valorTotal" }
                }
            }
        ]);

        res.status(200).json({
            totalCompras: totalCompras.length > 0 ? totalCompras[0].totalCompras : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
