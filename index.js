const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000


const app = express()

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

//public
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index.js'))


app.listen(PORT, console.log('Server has been started on' + PORT))

