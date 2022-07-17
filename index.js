require('dotenv').config()
require('./mongo')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')
const app = express()
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const { default: mongoose } = require('mongoose')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString()
  })
  note.save().then(savedNote => {
    res.json(savedNote)
    mongoose.connection.close()
  }
  ).catch(error => {
    console.log(error)
    res.status(500).json({ error: error.message })
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  Note.findById(id).then(note => {
    if (note) {
      return res.json(note)
    } else {
      res.status(400).end()
    }
  })
})

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      mongoose.connection.close()
      return res.json(result)
    })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))

  res.status(204).end()
})

// Middleware para controlar errores
app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
