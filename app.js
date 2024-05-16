require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

// database
const connectDB = require('./db/connect')

// routers
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res) => {
  res.send('e-commerce api')
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
