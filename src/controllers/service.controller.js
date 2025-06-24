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
