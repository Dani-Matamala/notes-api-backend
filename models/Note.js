const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

// Modificando el modelo devulto por mongoose
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  // el delete no elimina ningun dato de la base de datos
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
