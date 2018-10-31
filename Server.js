const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./App')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes)

app.listen(3015, () => {
    console.log('Start server at port 3015.')
})