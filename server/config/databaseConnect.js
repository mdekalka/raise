const mongoose = require('mongoose');
mongoose.Promise = Promise; 
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const DATABASE_NAME = 'raise';
const config = {
  useNewUrlParser: true
};
 
mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`, config)
  .then(_ => {
    console.log(`Successfully connected to ${DATABASE_NAME} db`)
  })
  .catch(err => {
    console.log('Connection error to database', err)
  });
