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

	r({
		method:'GET',
		uri:`http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`
		// qs: {
		// 	name: (req.body.name),
		// 	server: req.body.server
		// }
		
 	},

	function (error, response, body) {

  		if (!error && response.statusCode == 200) {
   		return res.status(200).send(body)
   	}

   	res.status(400)
   	return res.send(body)

  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Server has been started'))

// function fizzbuzz(n) {

// 	for(let i = 1; i <= n; i++) {

// 		num = '';

// 		if(i % 3 == 0) {
// 			num = 'fizz'
// 		}
// 		if (i % 5 == 0) {
// 			num += 'buzz'
// 		}

// 		console.log(num || i);
// 	}	

// }
// fizzbuzz(30)