const Service = require('../models/Service')

exports.createService = async (req, res) => {
  const { title, description } = req.body

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const newService = new Service({
      title,
      description
      // createBy: req.user.userId Assuming user ID is available in req.user
    })

    await newService.save()
    res.status(201).json({ message: 'Service created successfully', service: newService })
  } catch (error) {
    console.error('Error creating service:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.status(200).json({ message: 'Services retrieved successfully', services })
  } catch (error) {
    console.error('Error retrieving services:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getServiceById = async (req, res) => {
  const { id } = req.params

  try {
    const service = await Service.findById(id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.status(200).json({ message: 'Service retrieved successfully', service })
  } catch (error) {
    console.error('Error retrieving service:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updated
      ? res.status(200).json({ message: 'Service updated successfully', service: updated })
      : res.status(404).json({ message: 'Service not found' })
  } catch (error) {
    console.error('Error updating service:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
// exports.updateService = async (req, res) => {
//   const { id } = req.params
//   const { title, description } = req.body

//   try {
//     const service = await Service.findById(id)
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' })
//     }

//     if (title) service.title = title
//     if (description) service.description = description

//     await service.save()
//     res.status(200).json({ message: 'Service updated successfully', service })
//   } catch (error) {
//     console.error('Error updating service:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// }

// exports.deleteService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id)
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' })
//     }
//     res.status(200).json({ message: 'Service deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting service:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// }
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id)
    deleted
      ? res.status(200).json({ message: 'Service deleted successfully' })
      : res.status(404).json({ message: 'Service not found' })
  } catch (error) {
    console.error('Error deleting service:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
