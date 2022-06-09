const router = require("express").Router();
const Request = require("../models/requestModel");

router.post("/",  async (req, res) => {
  try{
    const {name, request} = req.body;


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
    // Return Data    
    res.json({data})
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});

router.post("/delete", async (req, res) => {
  try{
    // Deconstucts ID from front end
    const { id } = req.body;

    // Mongoose operation to delete 1 record
    await Request.findOneAndDelete({_id: id});
    res.json({msg: "Success"});    
   
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});


router.post("/edit", async (req, res) => {
  try{
    // Deconstucts ID, name and request from front end
    const {id, name, request} = req.body;
    
    // Find the data to update by the id and updates the data
    const data = await Request.findOneAndUpdate({ _id: id }, {name: name, request: request});
    res.json({message: "success"});
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});

router.post("/editData", async (req, res) => {
  try{
    // Deconstucts ID from front end
    const { id } = req.body;    

    // Find data in MongoDb for the ID provided
    const data = await Request.findOne({ _id: id }).exec();
    
    // Returns result
    res.json(data)  
  } catch(err) {
    console.log(err);
    res.status(500).send();
  };  
});



module.exports = router;
