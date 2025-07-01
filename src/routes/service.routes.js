const express = require('express')
const router = express.Router()
const serviceController = require('../controllers/service.controller')
const authenticateToken = require('../middlewares/auth.middleware')
const authorizeRole = require('../middlewares/role.middleware')

router.post('/', authenticateToken, authorizeRole('admin', 'superadmin'), serviceController.createService)
router.get('/', serviceController.getAllServices)
router.get('/:id', serviceController.getServiceById)

router.put('/:id', serviceController.updateService)
router.delete('/:id', authenticateToken, authorizeRole('admin', 'superadmin'), serviceController.deleteService)

module.exports = router
