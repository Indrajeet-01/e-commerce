const express = require('express')
const{registerUser, loginUser, logout, forgotPassward, resetPassword} = require('../controller/userController')
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassward)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

module.exports = router