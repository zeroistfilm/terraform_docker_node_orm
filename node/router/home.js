const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

router.get('/', (req, res)=>{
    res.send("홈화면");
})

module.exports = router;