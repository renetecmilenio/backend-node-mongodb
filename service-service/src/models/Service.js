import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Service', serviceSchema)
