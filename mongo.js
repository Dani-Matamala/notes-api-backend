const mongoose = require('mongoose')
const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to MongoDB')
  }
  ).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
