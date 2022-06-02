const express = require('express')
const pug = require('pug');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require('body-parser')

// Setup express
const app = express()


// create application/json parser
var jsonParser = bodyParser.json()
// for parsing application/xwww-form-urlencoded
app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);

// Setup dotenv
dotenv.config();

// Setup Pug view engine
app.set('view engine', 'pug')

// Setup static files
app.use(express.static('public'))

// Create port for live deployment and testing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));


// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);



// Serve the index page
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})


// Configure all the routes
app.use("/world", require("./routers/homeRouter"));
app.use("/crud", require("./routers/crudRouter"));

