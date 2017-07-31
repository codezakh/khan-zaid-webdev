/**
 * Created by zaidkhan on 7/29/17.
 */

// There is no actual routing code in this file. This file should only
// 'require' a bunch of other files, and add them to module.exports. For now
// though, I'm going to add it just for testing.


module.exports = function(app) {
    require('./services/page.service.server')(app);
    require('./services/user.service.server').api(app);
    require('./services/website.service.server')(app);
    require('./services/widget.service.server')(app);
};

