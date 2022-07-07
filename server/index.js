const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, respose) => {
  respose.send('<h1>Bike-Sharing</h1>')
})

app.post('/register', db.createUser)
app.post('/bike', db.createBike)
app.put('/pay', db.pay)
app.get('/user', db.userInformation)
app.get('/history', db.getHistory)
app.put('/unlock', db.unlock)
app.put('/lock', db.lock)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})