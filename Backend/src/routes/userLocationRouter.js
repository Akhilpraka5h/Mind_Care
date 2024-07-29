const express = require ('express'); 
const router = express.Router()
const {doctorLocation} = require ("../controllers/location.controller")



router.route('/location').post(doctorLocation)


module.exports = router ;