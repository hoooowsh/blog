const app = require('./app');
const config = require('config');
const port = config.get('appport');
const dbUrl = config.get('dbUrl');
const mongoose = require('mongoose');


console.log(dbUrl)
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connect server with db
const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once('open',()=>{
  console.log("Blog Database Connected!")
});

// let the port listen to incoming requests
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});
