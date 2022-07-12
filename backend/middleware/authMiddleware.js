const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// to protect getMe and goals from users without the right token
// in postman, use Ath - Bearer Token to display with the right token
const protect = asyncHandler (async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1] 
            // split the headers into an array with 'Bearer' and 'token' 
            // separated by a space, then take the [1] item ('token')

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token (decode id, password will not be decoded)
            req.user = await User.findById(decoded.id).select('-password')

            next() // at the end of this middleware, will be able to call another middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')

        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports = {protect}