const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffee.controller');

router.post('/', coffeeController.create);                // Insertar una compra
router.get('/', coffeeController.list);                   // Listar todas las compras
router.get('/count', coffeeController.contarCompras);
router.get('/sumar-kilos', coffeeController.sumarKilos);
router.get('/sumar-total-compras', coffeeController.sumarTotalCompras);
router.get('/:nombreCliente', coffeeController.findByClientName);  // Consultar por nombre del cliente
router.put('/:id', coffeeController.update);              // Actualizar una compra
router.delete('/:id', coffeeController.delete);           // Eliminar una compra
router.get('/valor/:id', coffeeController.consultarValorPagar); // Consultar el valor a pagar
router.get('/:idCompra', coffeeController.findById);
router.get('/convertirADolares/:idCompra', coffeeController.convertToDollars); //convertir el precio del kilo a dólares




module.exports = router;
