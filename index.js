const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const rp = require('request-promise');

const app = express()

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

//public
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  
  res.render('index', {
    title: 'War-Search'
  })
  
})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server has been started'))