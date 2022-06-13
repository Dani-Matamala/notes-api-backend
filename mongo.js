const mongoose = require('mongoose');
const password = require('./password');

const connectionString = `mongodb+srv://91Daniel-dev:${password}@cluster0.c0tymmg.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('connected to MongoDB');
}
).catch(error => {
    console.log('error connecting to MongoDB:', error.message);
})


// 
