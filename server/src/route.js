const express = require('express')
const router = express.Router()

const { registerUser, userLogin } = require('./controllers/userController')
const { userInterests, fetchNews ,getInterests} = require('./controllers/interestController')
const authMiddleware = require('./middleware/auth');

router.post('/register', registerUser)
router.post('/login', userLogin)
router.post('/update', authMiddleware, userInterests)
router.get('/interests',authMiddleware,getInterests)
router.get('/feed/:interest', authMiddleware, fetchNews)


module.exports = router
