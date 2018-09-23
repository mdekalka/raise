var mongoose = require('mongoose');

const config = {
  useNewUrlParser: true
}
 
mongoose.connect('mongodb://localhost/praise', config)
  .then(_ => {
    console.log('Successfully connected to praise db')
  })
  .catch(err => {
    console.log('Connection error', err)
  });
