const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.isAuth = async (req, resp, next) => {
    if (req.headers && req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.userId)

            if (!user) {
                return resp.json({ success: false, message: "unauthorized access!" })
            }
            req.user = user
            console.log(req.user, 'here is iut')
            next()

        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return resp.json({ success: false, message: "unauthorized access!" })
            }
            if (error.name === 'TokenExpiredError') {
                return resp.json({ success: false, message: "Session Expired try signin" })
            }
            return resp.json({ success: false, message: "Internal Server Error" })

        }

    }
}

