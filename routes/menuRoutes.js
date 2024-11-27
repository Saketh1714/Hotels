const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/Menu');

router.post('/',async(req,res)=>{
    try{
        const menudata=req.body;
        const newMenuItem=new MenuItem(menudata);
        const res1=await newMenuItem.save();
        console.log('data saved successfully');
        res.status(200).json(res1);
        

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }

});


router.get('/',async(req,res)=>{
    try{
        const data1=await MenuItem.find();
        console.log('data fetched successfully:');
        res.status(200).json(data1);
    }catch(err){
        console.log('error in fecthing the data from the database server:');
        res.status(500).json({err:'Internal server error'});
    }
});
//comment addes for testing purpose
module.exports=router;