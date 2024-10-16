const { Router } = require('express');
const { createPedido, getPedidosDomiciliario } = require('./controller');
const router = Router();

router.post('/checkout', createPedido);
router.get('/pedidos', getPedidosDomiciliario);

module.exports = router;