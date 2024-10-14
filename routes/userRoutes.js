const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;