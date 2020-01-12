const express = require('express');
const router = express.Router();
const Users = require('../model/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    const user = req.body;
    const response = await Users.find({email: user.email});
   
    if(response.length)
    {
        res.send(500, {message: "This email is already registered!"});
        return;
    }
    
    const hash = hashPassword(user.password);

    const newUser = new Users({
        full_name: user.full_name,
        email: user.email, 
        password: hash
    });

    newUser.save()
    .then(() => res.send({message: "User registered successfully!"}))
    .catch(e => res.send(500, {message: e.message}));
})

router.post('/login', async (req, res) => {
    
    //Check Email
    const user = await Users.find({email: req.body.email});
    
    if(!user.length) {
        res.send(500, {message: "User not found!"});
        return;
    }

    //Compare Email
    const passwordMatched = bcrypt.compareSync(req.body.password, user[0].password);

    if(!passwordMatched) {
        res.send(500, {message: "Incorrect Email/Password!"});
        return;
    }

    //Generate Token
    const token = jwt.sign({user: user[0]}, 'anySecretKey');
    res.send({user: user[0], token});
})



function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

module.exports = router;