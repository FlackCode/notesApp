import express, { json } from 'express'
import cors from 'cors'
const app = express()
app.use(json())
app.use(cors())
app.use(cors({
    origin: 'https://notes-app-tau-virid-47.vercel.app'
  }))
const PORT = process.env.PORT || 3001
export default PORT
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]
const generateID = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.get('/api/notes', (req, res) =>{
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if ( note ) {
        res.json(note)
    } else {
        return res.status(400).json({error: 'content missing'})
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    console.log('Operation successful.')
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }


    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateID(),
    }
    
    notes = notes.concat(note)

    res.json(note)
})

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
})
