const express=require('express');
const router=express.Router();
const Person=require('./../models/Person'); 

router.post('/',async(req,res)=>{
    try{
    const data=req.body;//--> extract the data from the body
    const newPerson=new Person(data);//--> create a new person document using the mongoose model
    const response=await newPerson.save();//--> save the new person to the database
     console.log('data saved');
     res.status(200).json(response);
    }
    catch(err){  
        console.log(err);
        res.status(500).json({error:'Internal server errro'});
    }
    
});



router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});



router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='worker')
        {
            const response=await Person.find({work:workType});
            console.log('data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
        
    }catch(err){
        console.log('data fetching is unsuccessfull');
        res.status(500).json({err:'Internal server error'});
    }
});
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response)
        {
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log('dat not updated:');
        res.status(500).json({err:'Internal server error'});
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response)
        {
            return res.status(404).json({error:'Person not found'});
        }
        console.log('person deleted successfully');
        res.status(200).json({message:'person data deleted successfully'});
    }
    catch(err){
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports=router;