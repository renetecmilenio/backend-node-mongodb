import Service from '../models/Service.js'

export const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Service.find()
    res.json(servicios)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicios' })
  }
}

export const crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body

    const nuevoServicio = new Service({
      nombre,
      descripcion,
      precio,
      creadoPor: req.user.userId // solo si tienes este campo
    })

    await nuevoServicio.save()
    res.status(201).json(nuevoServicio)
  } catch (error) {
    console.error('❌ Error al crear servicio:', error.message)
    res.status(500).json({ error: 'Error al crear servicio', detalle: error.message })
  }
}

export const editarServicio = async (req, res) => {
  try {
    const actualizado = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!actualizado) return res.status(404).json({ error: 'No encontrado' })
    res.json(actualizado)
  } catch (err) {
    res.status(400).json({ error: 'Error al editar servicio' })
  }
}

export const eliminarServicio = async (req, res) => {
  try {
    const eliminado = await Service.findByIdAndDelete(req.params.id)
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' })
    res.json({ message: 'Servicio eliminado' })
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar servicio' })
  }
}
