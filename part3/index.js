require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req, res) => {
  return JSON.stringify(res.body)
})
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.req(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  })
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((phonebook) => response.json(phonebook))
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})
app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name cannot be empty' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number cannot be empty' })
  }
  Person.findOne({ name: body.name }).then((person) => {
    if (person)
      return response.status(400).json({ error: 'name must be unique' })
    else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person
        .save()
        .then(() => response.json(person))
        .catch((error) => next(error))
    }
  })
})
app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body

  if (!name) {
    return response.status(400).json({ error: 'name cannot be empty' })
  }
  if (!number) {
    return response.status(400).json({ error: 'number cannot be empty' })
  }
  Person.findById(request.params.id).then((person) => {
    console.log(person)
    if (!person) return response.status(404).end()
    person.name = name
    person.number = number
    person.save().then(() => response.json(person))
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then((count) =>
    response.send(`Phonebook has info for ${count} people\n ${Date()}`)
  )
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
