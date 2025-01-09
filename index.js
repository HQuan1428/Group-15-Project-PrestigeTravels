const path = require('path')
const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const passport = require('passport')
const MyError = require('./error')
const { initializePassport } = require('./config/passport'); // Cấu hình Passport với chiến lược tự xây dựng

const port = 4000
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Cấu hình session
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }
}))
// Khởi tạo passport
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)

// Template engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    json: function (context) {
      return JSON.stringify(context)
    },
    eq: function (a, b) {
      return a === b
    },
    
    
  }
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static(path.join(__dirname, 'public')))

// Routers

// Trang chủ user
app.get('/', (req, res) => {
  const welcomeMessage = req.query.message; // Lấy thông báo từ query string
  res.render('register', {
    welcomeMessage, // Truyền thông báo vào view
    query: req.query,
    currentPage: 'home'
  })
})

const userRouter = require('./Routers/userRouters/userRouter')
app.use(userRouter)

// Register Routers
const registerRouter = require('./Routers/registerRouter')
app.use(registerRouter)

// Login Router
const loginRouters = require('./Routers/loginRouter')
app.use(loginRouters)

const logoutRoutes = require('./Routers/logoutRouter')
app.use(logoutRoutes)

// Admin
const adminRouters = require('./Routers/adminRouters/adminRouters')
app.use(adminRouters)

// Nhà cung cấp
const providerRouters = require('./Routers/providerRouters/providerRouter')
app.use('/partner', (req, res, next) => {
  console.log('Middleware for /partner');
  if (req.isAuthenticated() && req.user.userType === 'partner') {
    return next();
  }
  res.redirect('/login');
}, providerRouters)

// Khởi động server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
