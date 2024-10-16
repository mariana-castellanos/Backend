const { Router } = require('express');
const { createPedido, getPedidosDomiciliario } = require('./controller');
const router = Router();
const { updatePedido } = require("./controller");

router.post('/checkout', createPedido);
router.get('/pedidos', getPedidosDomiciliario);
router.put("/update/:id", updatePedido);

module.exports = router;