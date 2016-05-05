'use strict'
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    dataset = require('../data/data.json'),
    categories = require('../data/categories.json'),
    countries = require('../data/countries.json'),
    Android = require('../models/android.js')

    var countryMap ={
    ca:"05", us:"23", br:"27", ru:"118", au:"175", fr:"141", za:"80", in:"104", sa:"198", gb:"170"
  }

router.get('/api/:category', (req, res) => {
  const category = categories.find(function (category) {
    return category.code === req.params.category.toUpperCase()
  })
  if (category) {
    Android.find().exec(function (err, countries) {
      if (err) throw err
      const results = countries.map(function (country) {
        const obj = {}
        obj.totalAppCount = country.content.length
        obj.content = country.content.filter(function (app) {
          return category.code === app.genres[0]
        })
        obj.metadata = country.metadata
        return obj
      })

      const api = results.map(function(data, index, array){
        const mapData = {};
        mapData['id'] = countryMap[data.metadata.request.params.country];
        mapData['value'] = (data.content.length / data.totalAppCount * 100).toFixed(1)
        mapData['showLabel'] = "1";
        mapData['Long Name'] = "1";
        return mapData;
      });
    res.json(api)
    })
  } else {
    res.send('no category found')
  }

})

router.get('/api/:country/:category', (req, res) => {
  const category = req.params.category.toUpperCase()
  const country = countries.find(function (country) {
    return country.code === req.params.country
  })

  if (country) {
    Android.find().exec(function (err, countries) {
      if (err) throw err
      // get specific country
      const result = countries.find(function (location) {
        return location.metadata.request.params.country === country.code
      })
      // filter out category
      result.content = result.content.filter(function (app) {
        return app.genres[0] === category
      })

        const api = result.content.map(function(table){
        const tableapi = {}
        tableapi["title"] = table.title
        tableapi["icon"] = table.icon
        tableapi["developer"] = table.developer
        return tableapi
      })
      res.json(api)
    })
  } else {
    res.json({'status': 'no results found'})
  }
})


router.get('/data', (req,res) => {
  console.log('api');
  res.json(dataset);
});


module.exports = router;
