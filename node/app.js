const models = require("./models");
const sequelize = require('./models').sequelize;

// sequelize.sync().then(() => {
//     console.log('✓ DB connection success.');
// });

models.new_table.findAll()
  .then(result => {
      console.log(result);
    //  res.json(result);

  })
  .catch(err => {
     console.error(err);
  });