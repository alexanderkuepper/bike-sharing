var Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: '<url>',
    database: 'bikes',
    password: '<password>',
    port: 5432,
})

console.log("Kaltstart")

exports.handler = async (event) => {
    var promise = new Promise(
        function(resolve, reject) {
            pool.query('INSERT INTO bike (location, status) VALUES ($1, $2)', [event.location, false], (error, results) => {
                if (error) {
                    resolve({
                        statusCode: 400,
                        body: JSON.stringify({
                            message: 'Error'
                        })
                    })
                }
                else {
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 'Bike sucessfully created'
                        })
                    })
                }
            })
        })
    return promise
};