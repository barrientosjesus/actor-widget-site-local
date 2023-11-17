const express = require('express');
const router = express.Router();
const proxyCtrl = require('../../controllers/api/proxy');

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
router.get('/:proxyUrl*', proxyCtrl.fetchActors);

module.exports = router;