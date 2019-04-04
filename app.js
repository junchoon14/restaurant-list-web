//require 'express' in the project
const express = require('express')
const app = express()
const port = 3000

//requre 'express-handlebars' in the project
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  // past the restaurants data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  console.log(restaurant)
  // past a restaurant information into 'show' partial template
  res.render('show', { restaurants: restaurant[0] })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurantList.results.filter(restaurant => {
    const name = restaurant.name.toLowerCase()
    const category = restaurant.category.toLowerCase()
    return name.includes(keyword) || category.includes(keyword)
  })
  console.log(restaurant)
  // past a restaurant information into 'show' partial template
  res.render('index', { restaurants: restaurant })
})

//start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})