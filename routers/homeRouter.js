const router = require("express").Router();
const Request = require("../models/requestModel");

/**
 *  GET route data
 *  Renders the index page
 */
router.get("/", async (req, res) => {
  try{
    res.render('index', { title: 'Hello World', message: 'Hello there!' })

  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});

/**
 *  GET route data
 *  renders the example page
 */
router.get("/example", async (req, res) => {
  try{
    res.render('example')

  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});


/**
 *  GET route data
 *  Renders the form page
 */
router.get("/form", async (req, res) => {
  try{
    
    res.render('form')

  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});


/**
 *  GET route data
 *  Collects all the data in mongoDB and renders the data page
 */
router.get("/data", async (req, res) => {
  try{
    // Mongoose call to get all the data
    const data = await Request.find({});
    console.log(data);
    console.log(data[0]._id.valueOf());
    res.render('data', {userData: data, someFunction})

  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});

const someFunction = async (id) => {
  console.log("click");
  console.log(id);
}

module.exports = router;