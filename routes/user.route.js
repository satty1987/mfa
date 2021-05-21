const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/logout', userController.logout);
router.post('/logoutAll',  userController.logoutAll);
router.get('/get-qrcode/:userId',  userController.getQrCode);
router.get('/token/:userId',  userController.getTotpCode);
router.post('/validate',  userController.validateOtp);
router.get('/users', userController.getUsers);

module.exports = router;