const path = require('path')
const express = require('express')
const session = require('express-session')
const {engine } = require('express-handlebars')

const port = 4000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Template engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')

}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static(path.join(__dirname, 'public')))

// Routers

// trang chủ user
app.get('/', (req, res) => {
  res.render('userViews/home', {
    query: req.query,currentPage: 'home'
  })
})
// Register Routers
const registerRouter = require('./Routers/registerRouter')
app.use(registerRouter)

// Login Router
const loginRouters = require('./Routers/loginRouter')
app.use(loginRouters)

// Admin
const adminRouters = require('./Routers/adminRouters/adminRouters')
app.use(adminRouters)

// Nhà cung cấp
const providerRouters = require('./Routers/providerRouters/providerRouter')
app.use(providerRouters)

app.listen(port, () => {
  console.log(`Exaxmple app listening at http://localhost:${port}`)
})
