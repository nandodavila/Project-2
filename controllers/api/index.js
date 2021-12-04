const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commonListRoutes = require('./commonListRoutes');

router.use('/users', userRoutes);
router.use('/commonlist', commonListRoutes);

module.exports = router;
