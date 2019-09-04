const app = require('express')();
const routes = require('./routes/index.js');

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(4000, () => {
  console.log('App listening on port 4000');
});