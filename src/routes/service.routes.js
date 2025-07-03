const express = require('express')
const router = express.Router()
const serviceController = require('../controllers/service.controller')
const authenticateToken = require('../middlewares/auth.middleware')
const authorizeRole = require('../middlewares/role.middleware')
const {
  validateCreateService,
  validateUpdateService,
  validateDeleteService
} = require('../middlewares/validators/service.validator')
const handleValidation = require('../middlewares/handle.Validation')

router.post('/', authenticateToken, authorizeRole('admin', 'superadmin'), validateCreateService, handleValidation, serviceController.createService)
router.get('/', serviceController.getAllServices)
router.get('/:id', serviceController.getServiceById)

router.put('/:id', authenticateToken, authorizeRole('admin', 'superadmin'), validateUpdateService, handleValidation, serviceController.updateService)
router.delete('/:id', authenticateToken, authorizeRole('admin', 'superadmin'), validateDeleteService, handleValidation, serviceController.deleteService)

module.exports = router
