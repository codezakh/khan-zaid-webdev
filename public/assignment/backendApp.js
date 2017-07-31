// There is no actual routing code in this file. This file should only
// 'require' a bunch of other files, and add them to module.exports. For now
// though, I'm going to add it just for testing.



const express = require('express');
const userRouter = require('./services/user.service.server').router;

let apiRouter = express.Router();

apiRouter.use('/user', userRouter);

module.exports.router = apiRouter;

// module.exports = function(app) {
//     require('./services/page.service.server')(app);
//     require('./services/user.service.server').api(app);
//     require('./services/website.service.server')(app);
//     require('./services/widget.service.server')(app);
// };
