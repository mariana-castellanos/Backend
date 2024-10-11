const { Router } = require ('express')
const controller = require('./controller')
const router = Router();

router.post("/login", controller.login)
router.post('/register', controller.register);


module.exports = router;