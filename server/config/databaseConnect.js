const mongoose = require('mongoose');

const DATABASE_NAME = 'praise';
const config = {
  useNewUrlParser: true
};
 
mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`, config)
  .then(_ => {
    console.log(`Successfully connected to ${DATABASE_NAME} db`)
  })
  .catch(err => {
    console.log('Connection error', err)
  });
