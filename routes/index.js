const express = require('express');
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  
  res.render('index', {
    title: 'War-Search',
    isTop100: false
  })
  
})

router.post('/', (req, res) => {

	// r({
	// 	method:'GET',
	// 	uri:`http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`		
 // 	},

	// function (error, response, body) {

 //  		if (!error && response.statusCode == 200) {
 //   		return res.status(200).send(body)
 //   	}

 //   	res.status(400)
 //   	return res.send(body)

 //  })

 let getPost = async() => {
    try {
      let response = await fetch(`http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`);
      console.log(response.status)
      let data = await response.json()

      if(response.status == 200) {
        res.status(200).send(data)
      }

      else {
        console.log(32)
        res.status(400)
        res.send(data)
      }
    } catch(e) {
      res.status(400)
      console.log(e);
      let response = await fetch(`http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`);
      let data = await response.json()
     
      res.send(data)
      console.log(data)
      
    }
      

  }
  
  getPost()
})

router.get('/top100', (req, res) => {
  res.render('top100', {
    title: 'Top-100',
    isTop100: true
  })
})

router.post('/top100', (req, res) => {
  // r({
  //   method:'GET',
  //   uri:`http://api.warface.ru/rating/top100?server=${req.body.server}&class=${req.body.clas}`    
  // },

  // function (error, response, body) {

  //   if (!error && response.statusCode == 200) {
  //     res.status(200)
  //     return res.send(body)
  //   }

  //   console.log(error)
  //   res.status(400)
  //   return res.send(body)

  // })

  // (async function ReqFetch() {
  //   let result = await fetch(`http://api.warface.ru/rating/top100?server=${req.body.server}&class=${req.body.clas}`)
  //   console.log(result)

  //   if(result.status !== 200) {
  //     let data = await result.json()
  //     function getData(data) {
  //       res.status = 400
  //       return res.send(data)
  //     }
  //     getData(data)
  //   }

  //   let data = await result.json()

  //   function getData(data) {
  //     res.status = 200
  //     return res.send(data)
  //   }
  //   getData(data)

  // })()
   
  let getPost = async() => {
    try {
      let response = await fetch(`http://api.warface.ru/rating/top100?server=${req.body.server}&class=${req.body.clas}`);
      console.log(response.status)
      let data = await response.json()

      if(response.status == 200) {
        res.status(200).send(data)
      }

      else {
        console.log(32)
        res.status(400)
      }
    } catch(e) {
      res.status(400)
      res.send(e)
      console.log(e);
    }
      
    
    

  }
  
  getPost()

})

module.exports = router