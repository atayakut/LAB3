const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3003;

app.use(express.json());  // to take the datas

app.post('/cars', (req, res) => {
  const newCar = req.body;
  fs.readFile('./data/data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Veri yüklenemedi');
    } else {
      const cars = JSON.parse(data);
      cars.push(newCar);  // add new one
      fs.writeFile('./data/data.json', JSON.stringify(cars, null, 2), (err) => {
        if (err) {
          res.status(500).send('Veri kaydedilemedi');
        } else {
          res.status(201).json(newCar);  // get the new car
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
