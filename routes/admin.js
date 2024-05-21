const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/users', adminController.postAddCustomer);