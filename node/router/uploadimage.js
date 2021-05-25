const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
const s3 = require('../utils/s3.js');
const models = require("../models");

router.get('/', (req, res)=>{
    res.render('../views/uploadimage.html');
})


router.post('/api/file/upload', upload.single("file"), function(req, res){
    const params = s3.uploadParams;
    params.Key = req.file.originalname;
    params.Body = req.file.buffer;

    console.log(params);
    console.log('파일 이름 내놔 : ' + params.Key );

    s3.upload(params, (err, data) => {
        if (err) {
            res.status(500).send('<script type="text/javascript">alert("업로드실패");</script>');
        }
        var s3url = getUrlFormBucket(s3, req.file.originalname);
        console.log(s3url);

        models.imageurls.create({imgUrl: s3url})
        .then(function(result) {
            res.render('../views/uploadimage.html');
            console.log("insert url in db");
        })
        .catch(function(err) {
            res.json(err);
        });

        // res.render('../views/uploadimage.html');
        // res.json({message: 'upload success! -> filename = ' + req.file.originalname});
    });
});

function getUrlFormBucket(s3Bucket, fileName){
    const {config :{region},uploadParams} = s3Bucket;
    const regionString = region.includes('ap-northeast-2') ? '':('-'+region);
    return `https://${uploadParams.Bucket}.s3${regionString}.amazonaws.com/${fileName}`
};
module.exports = router;
