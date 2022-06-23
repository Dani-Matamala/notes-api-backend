require('dotenv').config()
require('./mongo')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.static('build'))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

let notes = []

app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log(body)
    if (!body.content)
        return res.status(400).json({ error: 'content missing' })

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date().toISOString()
    })
    note.save().then(savedNote => {
        res.json(savedNote)
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

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
