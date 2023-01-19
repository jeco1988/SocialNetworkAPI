const router = require('express').Router();
const userRoutes = require('./userroute');
const thoughtRoutes = require('./thoughtroute');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;