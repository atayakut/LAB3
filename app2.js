const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3002;

// to tkae the json data middleware
app.use(express.json()); // read the request

// getter to take car
app.get('/cars', (req, res) => {
  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Data could not be uploaded');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// post request to add the new car
app.post('/cars', (req, res) => {
  const newCar = req.body; // json data comes from postman
  
  // read the current ccars
  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Data could not be uploaded');
      return;
    }

    let cars = JSON.parse(data);
    cars.push(newCar); // add the new cars to the current cars list

    // save the updates file to json file
    fs.writeFile('./data/data.json', JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        res.status(500).send('Data could not be saved');
      } else {
        res.status(200).send('New car added');
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
