// There is no actual routing code in this file. This file should only
// 'require' a bunch of other files, and add them to module.exports. For now
// though, I'm going to add it just for testing.



const express = require('express');
const userRouter = require('./services/user.service.server').router;
const websiteRouter = require('./services/website.service.server').router;
const pageRouter = require('./services/page.service.server').router;
const widgetRouter = require('./services/widget.service.server').router;

let apiRouter = express.Router({mergeParams: true});

apiRouter.use('/user', userRouter);
apiRouter.use('/website', websiteRouter);
apiRouter.use('/page', pageRouter);
apiRouter.use('/widget', widgetRouter);

module.exports.router = apiRouter;

// module.exports = function(app) {
//     require('./services/page.service.server')(app);
//     require('./services/user.service.server').api(app);
//     require('./services/website.service.server')(app);
//     require('./services/widget.service.server')(app);
// };

