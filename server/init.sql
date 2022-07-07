CREATE TABLE IF NOT EXISTS customer (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  postcode INT,
  town VARCHAR(30),
  house_number INT,
  address VARCHAR(30),
  username VARCHAR(30) UNIQUE,
  amount INT
);

CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  bike_id INT,
  start_time TIME,
  end_time TIME,
  amount INT
);

CREATE TABLE IF NOT EXISTS bike (
    id SERIAL PRIMARY KEY,
    location VARCHAR(30),
    status BOOLEAN
);