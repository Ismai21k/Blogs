const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/Protect');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', protect, loginUser);


module.exports = router;