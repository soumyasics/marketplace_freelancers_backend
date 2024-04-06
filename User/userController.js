const express = require('express');
const router = express.Router();
const user = require('./userSchema')

const userRegistration = async (req, res) => {
    try {
        const user = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
          
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllusers = async (req, res) => {
    try {
        const users = await user.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getuserById = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await user.findById(_id);
        if (!user) {
            return res.status(404).json(null);
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json(error);
    }
};


//Login Artist 
const loginuser = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    user.findOne({ email: email }).exec().then(data => {
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
const edituserById = (req, res) => {



    user.findByIdAndUpdate({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
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


const deleteuserById = (req, res) => {

    user.findByIdAndDelete({ _id: req.params.id }).exec()
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



    user.findOneAndUpdate({ email: req.body.email }, {

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
    userRegistration,
    getAllusers,
    getuserById,
    loginuser,
    edituserById,
    deleteuserById,
    forgotPwd
};
