const express = require('express');
const models = require("./models");
const sequelize = require('./models').sequelize;
const app = express();

const home = require('./router/home');
const uploadimage = require('./router/uploadimage');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/home', home);
app.use('/uploadimage', uploadimage);

// ===================DB=================
// 테이블싱크, 테이블이 없다면 생성해준다. DDL
sequelize.sync().then(() => {
    console.log('✓ DB connection success.');
});


// var showAllUserData = models.new_table.findAll()
//   .then(result => {
//     // return result.dataValues;
//     // res.json(result);
//   })
//   .catch(err => {
//     console.error(err);
//   });







// ===================webpage=================
app.listen(5000, () => console.log('5000번 포트에서 대기중'));

app.get('/', (req, res) => {
  res.render('home.html');
})


app.get('/showallurls', async (req, res) => {
  // DML
  var imgurls = await models.imageurls.findAll();
  return res.send(imgurls);
  // res.send(showAllUserData);
})




app.get('/showallimg', async (req, res) => {

  var showAllimgs = await models.imageurls.findAll();
  return res.json(showAllimgs);
  // res.send(showAllUserData);
})

app.get('/showallusers', async (req, res) => {
  // DML
  var showAllUserData = await models.new_table.findAll( {attributes:  ['UserImage'] });

  showAllUserData.forEach(function(user){
    console.log(user['dataValues']['UserImage']);
  })
  return res.json(showAllUserData[0]);
  // res.send(showAllUserData);
})


app.get('/showone/:id', async (req, res) => {
  // DML
console.log(req.params.id)//: url 파라미터 정보를 조회
console.log(req.query)//: 쿼리 문자열을 조회
console.log(req.body)//: 요청 바디를 조회

  var selectedone = await models.new_table.findOne( {where: {id:req.params.id} });
  res.writeHead(200, {'Content-Type':'text/html'});
  var img = selectedone['UserImage'];
  res.end(`<img id="top-nav" src="${img}"/>`);
})


//AJAX GET METHOD
app.get('/api/get',function(req,res) {
  var data = req.query.data;
  console.log('GET Parameter = ' + data);
  var result = data + ' Succese';
  console.log(result);
  res.send({result:result});
});


//AJAX POST METHOD
app.post('/api/post', function(req, res){
  var data = req.body.data;
  console.log('POST Parameter = ' + data);
  var result = data + ' Succese';
  console.log(result);
  res.send({result:result});
});

