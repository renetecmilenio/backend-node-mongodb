const express = require('express')
const router = express.Router()
const { createService } = require('../controllers/service.controller')
router.post('/', createService)

module.exports = router
