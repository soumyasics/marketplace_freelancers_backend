const express=require('express')
const router=express.Router()
const freelancer=require('./Freelancers/freelancerController')

router.post('/freelancerRegistration',freelancer.upload,freelancer.freelancerRegistration)
router.post('/getAllFreelancers',freelancer.getAllFreelancers)
router.post('/getFreelancerById/:id',freelancer.getFreelancerById)
router.post('/freelancerLogin',freelancer.loginFreelancer)
router.post('/editFreelancerById/:id',freelancer.editFreelancerById)
router.post('/deleteFreelancerById/:id',freelancer.deleteFreelancerById)
router.post('/forgotPwd',freelancer.forgotPwd)

module.exports=router