const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const url = require('../config');
const upload = require('../middleware/upload');
const Image = require('../models/image');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

module.exports = () => {
    let gfs;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    connect.once('open', () => {
        // initialize stream
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });
    

    router.route('/upload')
        .post(upload.single('file'), (req, res, next) => {
            console.log('HERE IS REQ BODY LOL');
            let newImage = new Image({
                filename:req.file.originalname,
            });
            console.log("HERE WE ARE MY GOOD FRIEND LOL 112341231342");
            newImage.save()
                // .then((image) => {
                //     res.status(200).json({
                //         success: true,
                //         image,
                //     });
                //     console.log("HERE WE ARE MY GOOD FRIEND LOL 123");
                // })
                .catch(err => res.status(500).json(err));
                console.log("HERE WE ARE MY GOOD FRIEND LOL 123");
        });

    router.get('/', homeController.getHome);

    //for user


    router.post( '/signin', (req, res) => {
        //here we can validate

        const username = req.body.username
        const password = req.body.password

        User.findOne({username}).then( usr => {
            if(user){
                bcrypt.compare(password, usr.password).then(app => {
                    err.password = "false password"
                    if(!app) return res.status(400).json(err);
                })
            }else{
                return res.status(400).json(errors);
            }

            //otherwise, we know user not found

        } )
    })


    router.post('/signup', (req,res)=> {
        //add here to validate input
        User.findOne( {  username  }  ).then( usr => {
            if(usr){
                errors.username = "Username is already in use";
                return res.status(400).json(errors)
            }
            //create user if one with name does not already exist
            const newUser = new User({
                username:username,
                password:password
            });
            const saltRound = 5;
            bcrypt.genSalt(saltRound, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => { 
                    newUser.password = hash;
                    newUser.save().then( () => {return res.json(newUser)}).catch(err => res.status(500).json(err))
                    return res.json(newUser);
                });
              });
        }    )

    });





    return router;
}