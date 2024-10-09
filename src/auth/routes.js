const { Router } = require ('express')
const controller = require('./controller')
const router = Router();

router.post("/login", controller.login)
module.exports = router;