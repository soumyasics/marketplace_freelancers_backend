const express = require('express');
const router = express.Router();
const Freelancer = require('./freelancerSchema')

const multer = require('multer')

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
            profilepic: req.file,
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
const loginFreelancer = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Freelancer.findOne({ email: email }).exec().then(data => {
        if (!data) {
            return res.json({
                status: 405,
                msg: "User not found",
            })
        } else if (password == data.password) {
            return res.json({
                status: 200,
                msg: "Login successfully",
                data: data
            })
        } else {
            return res.json({
                status: 500,
                msg: "password Mismatch",

            })
        }

    }).catch(err => {
        res.json({
            status: 500,
            msg: "User not found",
            Error: err
        })
    })
};


//Login --finished


//update  by id
const editFreelancerById = (req, res) => {



    Freelancer.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        qualification: req.body.qualification,
        profilepic: req.file,
        age: req.body.age,
        jobrole: req.body.jobrole
    })
        .exec().then(data => {
            res.json({
                status: 200,
                msg: "Updated successfully"
            })
        }).catch(err => {
            res.json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            })
        })
}


const deleteFreelancerById = (req, res) => {

    Freelancer.findByIdAndDelete({ _id: req.params.id }).exec()
        .then(data => {

            console.log(data);
            res.json({
                status: 200,
                msg: "Data removed successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })

}
//forgotvPawd
const forgotPwd = (req, res) => {



    Freelancer.findOneAndUpdate({ email: req.body.email }, {

        password: req.body.password
    })
        .exec().then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                })
            else
                res.json({
                    status: 500,
                    msg: "Artist Not Found"

                })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            })
        })
}



module.exports = {
    freelancerRegistration,
    getAllFreelancers,
    getFreelancerById,
    upload,
    loginFreelancer,
    editFreelancerById,
    deleteFreelancerById,
    forgotPwd
};
