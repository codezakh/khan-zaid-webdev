const cors = require('cors');
var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');
//require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

require('./test/app');

module.exports = app;
var apiRouter = require('./public/assignment/backendApp').router;

app.use('/api', apiRouter);

app.listen(process.env.PORT || 3000);

