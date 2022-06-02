const router = require("express").Router();
const Request = require("../models/requestModel");

router.post("/",  async (req, res) => {
  try{

    const {name, request} = req.body;

    console.log(name, request);
    console.log("post crud called")
    const newRequest = new Request({
      name,
      request,
    });

    const savedUser = await newRequest.save();

  } catch(err){
    console.log(err);
  }
})

router.get("/read", async (req, res) => {
  try{
    // Mongoose call to get all the data
    const data = await Request.find({});  
    console.log(data);  
    res.json({data})
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});

router.post("/delete", async (req, res) => {
  try{
    // Mongoose call to get all the data
    console.log("Delete route called")
   // const data = await Request.find({});  
    //console.log(data);  
    //res.json({data})
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});


router.post("/edit", async (req, res) => {
  try{
    // Mongoose call to get all the data
    console.log("Edit route called")
   // const data = await Request.find({});  
    //console.log(data);  
    //res.json({data})
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});


module.exports = router;
