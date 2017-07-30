/**
 * Created by zaidkhan on 7/29/17.
 */
module.exports = function(app) {
  app.post('/api/user', (req, response) => {
    response.send({a: 'bol'})
  })
};
