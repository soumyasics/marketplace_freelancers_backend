const express = require('express');
const router = express.Router();
const Freelancer=require('./freelancerSchema')

const multer=require('multer')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilepic");
const freelancerRegistration = async (req, res) => {
    try {
        const freelancer = new Freelancer({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            qualification: req.body.qualification,
            profilepic: req.files,
            age: req.body.age,
            jobrole: req.body.jobrole
        });
        await freelancer.save();
        res.status(201).send(freelancer);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllFreelancers = async (req, res) => {
    try {
        const freelancers = await Freelancer.find({});
        res.status(200).json(freelancers);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getFreelancerById = async (req, res) => {
    const _id = req.params.id;
    try {
        const freelancer = await Freelancer.findById(_id);
        if (!freelancer) {
            return res.status(404).json(null);
        }
        res.status(200).send(freelancer);
    } catch (error) {
        res.status(500).json(error);
    }
};


//Login Artist 
const loginFreelancer=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
  
    Freelancer.findOne({email:email}).exec().then(data=>{
        if(!data){
            return res.json({
                status:405,
      msg:"User not found",
            })
        }else if(password==data.password){
            return  res.json({
          status:200,
          msg:"Login successfully",
          data:data
      })
    }else{
        return  res.json({
        status:500,
        msg:"password Mismatch",
        
    })
    }
    
  }).catch(err=>{
  res.json({
      status:500,
      msg:"User not found",
      Error:err
  })
  })
    };
  
  
  //Login Artist --finished
  
  

module.exports = {freelancerRegistration,
    getAllFreelancers,
    getFreelancerById,
    upload,
loginFreelancer};
