const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const {
  handleRegister,
  handleLogin,

} = require('./services');

const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/register', (req, res) => {
  handleRegister(req, res);
})



app.post('/api/login', async (req, res) => {
  handleLogin(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

