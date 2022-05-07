const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// middle ware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
  res.send('success')
})
app.listen(port, () =>{
  console.log('lintening to port', port);
})
