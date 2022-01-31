const { Router } = require('express');
//importamos funciones del controlador
const { getAllDiet } = require('../controller/Diet.controller');

const router = Router();

//------- localhot:3000/diet/ ------

//GET
router.get('/get/types', getAllDiet);

module.exports = router;
