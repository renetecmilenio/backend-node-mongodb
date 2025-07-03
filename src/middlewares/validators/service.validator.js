const { body, validationResult, param } = require('express-validator')

const validateCreateService = [
  body('title')
    .notEmpty()
    .withMessage('El nombre del servicio es requerido')
    .isLength({ min: 3 })
    .withMessage('El nombre del servicio debe tener al menos 3 caracteres').escape(),
  body('description')
    .notEmpty()
    .withMessage('La descripción del servicio es requerida')
    .isLength({ min: 10 })
    .withMessage('La descripción del servicio debe tener al menos 10 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUpdateService = [
  body('title').optional()
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage('El nombre del servicio debe tener al menos 3 caracteres')
    .escape(),
  body('description').optional().trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateDeleteService = [
  param('id')
    // .notEmpty()
    // .withMessage('El ID del servicio es requerido')
    .isMongoId()
    .withMessage('El ID del servicio debe ser un ID de MongoDB válido'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateCreateService,
  validateUpdateService,
  validateDeleteService
}
