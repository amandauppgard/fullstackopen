const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())

morgan.token('data', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${entries.length} people <br/> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/api/persons/:id', (request, response) => {
    const entry = entries.find(e => e.id === request.params.id)

    if (entry) {
        response.json(entry)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    entries = entries.filter(entry => entry.id !== id);
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and/or number is missing'
        })
    }

    if (entries.find(entry => entry.name === body.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const newID = Math.floor(Math.random() * 1000)
    const entry = {
        id: newID.toString(),
        name: body.name,
        number: body.number
    }

    entries = entries.concat(entry)
    response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})