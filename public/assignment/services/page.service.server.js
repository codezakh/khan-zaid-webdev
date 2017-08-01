const _ = require('lodash');
const express = require('express');

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  response.send(createPage(request.params.websiteId, request.body));
});

function createPage(websiteId, page){
  page._id = String(Number(_.last(pages)._id) + 1);
  page.websiteId = websiteId;
  pages.push(page);
  return page;
}



var pages = [
  {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
  {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
  {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
]


var _pageResetData = _.cloneDeep(pages);

function resetData(){
  pages = _.cloneDeep(_pageResetData);
};


module.exports.reset = resetData;
module.exports.router = router;
