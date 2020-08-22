const express 	= require('express');
const router 	= express.Router();

const main = require('../Controllers/task');

router.get('/get', main.getAll);
router.post('/add',main.insert);
router.post('/update',main.update);
router.get('/delete/:id',main.delete);

module.exports = router;