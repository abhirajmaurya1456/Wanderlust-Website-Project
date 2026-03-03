const express=require("express");
const router=express.Router();

//Index post
router.get("/",(req,res)=>{
res.send("Get for posts.");
});
//Show post
router.get("/:id",(req,res)=>{
res.send("Get for show posts.");
});
//POST post
router.post("/",(req,res)=>{
res.send("POST for posts.");
});
//Delete post
router.delete("/:id",(req,res)=>{
res.send("DELETE for posts.");
});
module.exports=router;
