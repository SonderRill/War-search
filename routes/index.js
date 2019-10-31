const express = require('express');
const router = express.Router()
const rp = require('request-promise')

router.get('/', (req, res) => {
  
  res.render('index', {
    title: 'War-Search',
    isTop100: false,
    isClans:false
  })
  
})

router.post('/', (req, res) => {


  let options = {
    method: 'GET',
    uri: `http://api.warface.ru/user/stat/?name=${encodeURIComponent(req.body.name)}&server=${req.body.server}`
  };


  async function GetUser() {

    try {
      let response = await rp(options)
      await res.status(200)
      res.send(response)
    } catch(e) {
      await res.status(400)
      res.send(e.error)
    }  
  
  }

  GetUser()

})

router.get('/top100', (req, res) => {
  res.render('top100', {
    title: 'Top-100',
    isTop100: true,
    isClans:false
  })
})

router.post('/top100', (req, res) => {

  let options = {
    method: 'GET',
    uri: `http://api.warface.ru/rating/top100?server=${req.body.server}&class=${req.body.clas}`
  };

  async function getUser() {
    try {
      let response = await rp(options)
      await res.status(200)
      res.send(response)

    } catch(e) {
      await res.status(400)
      res.send(e.message)
      console.log(e);
    }
  
  }
  
  
  getUser()

  

})

router.get('/clans', (req, res) => {
  res.render('clan',{
    title:'Рейтинги кланов',
    isTop100: false,
    isClans:true
  })
})

router.post('/clans', (req, res) => {
  let options = {
    method: 'POST',
    uri: `http://api.warface.ru/rating/clan?server=${req.body.server}`
  };

    async function getUser() {
    try {
      let response = await rp(options)
      await res.status(200)
      res.send(response)

    } catch(e) {
      await res.status(400)
      res.send(e.message)
      console.log(e);
    }
  
    }
  
    getUser()
  
})

module.exports = router