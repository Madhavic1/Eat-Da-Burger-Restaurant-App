var express = require('express');

var router = express.Router();

//import the model burger.js to use its database functions
var burger = require('../models/burger');

//create all routes and set up logic within those routes where required

router.get("/index",(req,res)=>{
    burger.selectAll(function(data){
        var hbsObj = {
            burgers : data
        }
        res.render("index",hbsObj);
    });
    
});

router.post("/api/burgers",function(req,res){
    console.log(req.body.burger_name);
    
    burger.insertOne(["burger_name"],[req.body.burger_name],function(result){
        res.json({id:result.insertId});
    });
    // res.send("received the request")
});

router.put("/api/burgers/:id",function(req,res){
    var condition = "id = "+req.params.id;
    console.log(`id is ${condition}`);
    
    console.log( req.body.devoured);
    
    burger.updateOne(
        {
            devoured : req.body.devoured
        },
        condition,
        function(result){
            if(result.changedRows === 0){
                //If no rows were changed , then ID must not exist, so throw 404 error as a response
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;
