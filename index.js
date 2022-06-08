const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log(body)
    if (!body.conntent)
        return res.status(400).json({ error: 'content missing' })
    else {
        const newNote = {
            conntent : body.content,
            important : body.important || false,
            id: generateId(),
            date: new Date().toISOString()
        }
        notes = notes.concat(newNote);
        res.json(newNote);
    }
})

const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
}

        

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    note ?
        res.json(note) :
        res.status(404).end();
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});