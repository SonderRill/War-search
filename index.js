const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const rp = require('request-promise');
const r = require('request')

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

app.post('/', (req, res) => {

	r.post({
   	url: `http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`
   
  		},
  		(err, response, body) => {
    		if (err) return res.status(500).send({ message: err })
    			
    		return res.send(body)
  		}
	)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server has been started'))