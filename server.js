var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
//require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

require('./test/app');
require('./public/assignment/backendApp')('sprongle');

module.exports = app;

app.listen(process.env.PORT || 3000);

