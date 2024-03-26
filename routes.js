const express=require('express')
const router=express.Router()
const freelancer=require('./Freelancers/freelancerController')

router.post('/freelancerRegistration',freelancer.upload,freelancer.freelancerRegistration)
router.post('/getAllFreelancers',freelancer.getAllFreelancers)
router.post('/getFreelancerById/:id',freelancer.getFreelancerById)

module.exports=router