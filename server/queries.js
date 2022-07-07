const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: 'bikes',
  password: process.env.PASSWORD,
  port: 5432,
})

const getHistory = (request, response) => {
  const { username } = request.body
  console.log(username)
  pool.query("SELECT id FROM customer WHERE username= $1", [username], (error, results) => {
      console.log(results.rows)
      var customerId = results.rows[0].id
      pool.query('SELECT * FROM history WHERE customer_id = $1 ORDER BY start_time ASC', [customerId], (error, results) => {
        if (error) {
          response.status(400).send(`Error`)
        } else {
          response.status(200).json(results.rows)
        }
      })
    })
  }
  
  const userInformation = (request, response) => {
    const { username } =  request.body
    pool.query('SELECT * FROM customer WHERE username = $1', [username], (error, results) => {
      if (error) {
        response.status(400).send(`Error`)
      }
      response.status(200).json(results.rows)
    })
  }

  const pay = (request, response) => {
    const { amount, username } = request.body
  
    pool.query('UPDATE customer SET amount = amount + $1 WHERE username = $2', [amount, username], (error, results) => {
        if (error) {
          response.status(400).send(`Error`)
        }
        response.status(200).send(`add amount of ${amount} successfully`)
      }
    )
  }
  
  const createBike = (request, response) => {
    const { location } = request.body
  
    pool.query('INSERT INTO bike (location, status) VALUES ($1, $2)', [location, false], (error, results) => {
      if (error) {
        response.status(400).send(`Error`)
      }
      response.status(201).send(`add bike successfully`)
    })
  }

  const createUser = (request, response) => {
    const { firstname, lastname, postcode, town, housenumber, address, username } = request.body
  
    pool.query('INSERT INTO customer (firstname, lastname, postcode, town, house_number, address, username, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [firstname, lastname, postcode, town, housenumber, address, username, 0], (error, results) => {
      if (error) {
        response.status(400).send(`Error`)
      } else {
        response.status(201).send(`register user was successfully`)
      } 
    })
  }

  const unlock = async (request, response) => {
    const { username, bike } = request.body
    pool.query("SELECT id FROM customer WHERE username= $1", [username], (error, results) => {
      var customerId = results.rows[0].id
      pool.query('SELECT status FROM bike WHERE id=$1', [bike], (error, results) => {
        var bikeStatus = results.rows[0].status
        if(bikeStatus) {
          response.status(400).send(`Bike is already rented`)
          return 
        } else {
          pool.query('INSERT INTO history (customer_id, bike_id, start_time) VALUES ($1, $2, current_timestamp)', [customerId, bike], (error, results) => {
            if (error) {
              console.log(error)
              response.status(400).send(`Error`)
            } else {
              response.status(200).send(`Unlock successfully`)
            } 
          })
          pool.query('UPDATE bike SET status = true WHERE id = $1', [bike])
        }
      })
    })
  }

  const lock = (request, response) => {
    const { username, bike } = request.body
    pool.query("SELECT id FROM customer WHERE username= $1", [username], (error, results) => {
      var customerId = results.rows[0].id
      pool.query('SELECT status FROM bike WHERE id=$1', [bike], (error, results) => {
        var bikeStatus = results.rows[0].status
        if(bikeStatus) {
          pool.query('UPDATE bike SET status = false WHERE id = $1', [bike])
          pool.query('Update history SET end_time= current_timestamp, amount = 5')
          pool.query('UPDATE customer SET amount = amount - 5 WHERE username = $1', [username])
        } else {
          response.status(400).send(`Bicycle was not borrowed`)
          return 
        }
        response.status(200).send(`Bicycle successfully returned`)
      })

    })
  }
  
  module.exports = {
    unlock,
    lock,
    pay,
    userInformation,
    getHistory,
    createBike,
    createUser,
  }