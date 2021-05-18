const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.send("사진업로드");
})

module.exports = router;