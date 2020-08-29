require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/routes/index')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/', routes)

app.use('/uploads', express.static('./uploads'))
app.use((req, res) => {
  res.send({
    status_code: 404,
    message: 'URL Failed'
  })
})
app.listen(PORT, () => { console.log(`server is running ${PORT}`) })
