
const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require("mb64-connect")

const router = express.Router();
const JWT_SECRET = "fdoisewjfdoijaojs"




const User = connectDB.validation("user",{
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
})


//route designed based with respect to firebase
// login and signup handled by firebase 
router.post('/userValidation', async (req, res) => {
    const { email, name, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
           
            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials', validation: false });
            }

       
            const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
                expiresIn: '1h',
            });

            return res.status(200).json({ message: 'Login SuccessFul', validation: true, token });
        } else {
         
            const newUser = new User({ email, name, password });
            user = await newUser.save();

          
            const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
                expiresIn: '1h',
            });

            return res.status(201).json({ message: 'User registered successfully', validation: true, token });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, validation: false });
    }
});


router.get('/validateToken', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is required', validation: false });
    }

    try {
       
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', validation: true, user: decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', validation: false });
    }
});


module.exports = router;
