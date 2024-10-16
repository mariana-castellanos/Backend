const { Router } = require('express');
const { createPedido } = require('./controller');
const router = Router();

router.post('/checkout', createPedido);

module.exports = router;