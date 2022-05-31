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

module.exports = router;
