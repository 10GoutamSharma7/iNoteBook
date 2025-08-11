const express = require('express')
const connectToMongo = require('./db');
connectToMongo();
const cors = require('cors')

const app = express()
const port = 5000
app.use(cors());

//if i have to use req.body then i have to use this middleware (to resolve undefined in console)
app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World! fuck offfffffff')
})

app.listen(port, () => {
  console.log(`iNOTEBOOK backend listening on port ${port}`)
})
