const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const s3 = require('../utils/s3.js');

router.get('/', (req, res)=>{
    res.render('../views/uploadimage.html');
})


router.post('/api/file/upload', upload.single("file"), function(req, res){
   
    const params = s3.uploadParams;
    
    params.Key = req.file.originalname;
    params.Body = req.file.buffer;

    console.log('파일 이름 내놔 : ' + params.Key );

    s3.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({error:"Error -> " + err});
        }

        // var s3url = getUrlFormBucket(s3, req.file.originalname);
        console.log(s3url);
        res.json({message: 'upload success! -> filename = ' + req.file.originalname});
    });
});

// function getUrlFormBucket(s3Bucket, fileName){
//     const {config :{params, region}} = s3Bucket;
//     const regionString = region.includes('ap-northeast-2') ? '':('-'+region);
//     return `https://${params.Bucket}.s3${regionString}.amazonaws.com/${fileName}`
// };
module.exports = router;