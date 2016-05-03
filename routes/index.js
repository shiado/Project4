var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    dataset = require('../data/data.json')
    categories = require('../data/categories.json')
    Android = require('../models/android.js')

router.get('/api/:category', (req, res) => {
  // const category = categories.find(function (category) {
  //   return category.code === req.params.category
  // })
  const category = req.params.category
  if (category) {
    Android.find().exec(function (err, countries) {
      if (err) throw err
      const results = countries.map(function (country) {
        const obj = {}
        obj.content = country.content.filter(function (app) {
          return category === app.genres[0]
        })
        obj.metadata = country.metadata
        return obj
      })
      res.json(results)
    })
  } else {
    res.send('no category found')
  }

})

router.get('/data', (req,res) => {
  console.log('api');
  res.json(dataset);
});


module.exports = router;
