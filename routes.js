const express=require('express')
const router=express.Router()
const freelancer=require('./Freelancers/freelancerController')
const user = require('./User/userController');
// freelancer routes 
router.post('/freelancerRegistration',freelancer.upload,freelancer.freelancerRegistration)
router.post('/freelancerLogin',freelancer.loginFreelancer)
router.post('/editFreelancerById/:id',freelancer.editFreelancerById)
router.post('/getAllFreelancers',freelancer.getAllFreelancers)
router.post('/getFreelancerById/:id',freelancer.getFreelancerById)
router.post('/deleteFreelancerById/:id',freelancer.deleteFreelancerById)
router.post('/forgotPwd',freelancer.forgotPwd)


// user routes
router.post('/userRegistration',user.userRegistration)
router.post('/userLogin',user.userLogin)
module.exports=router