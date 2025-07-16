import express from 'express'
import {
  crearServicio,
  obtenerServicios,
  editarServicio,
  eliminarServicio
} from '../controllers/service.controller.js'

import { verifyToken } from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/authorize.js'

const router = express.Router()

// Público
router.get('/', obtenerServicios)

// Protegidos: solo admin o superadmin pueden crear, editar o eliminar
router.post('/', verifyToken, authorizeRoles('admin', 'superadmin'), crearServicio)
router.put('/:id', verifyToken, authorizeRoles('admin', 'superadmin'), editarServicio)
router.delete('/:id', verifyToken, authorizeRoles('admin', 'superadmin'), eliminarServicio)

export default router
