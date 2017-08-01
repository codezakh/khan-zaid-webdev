const _ = require('lodash');
const express = require('express');
const widgetRouter = require('./widget.service.server').router;

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  response.send(createPage(request.params.websiteId, request.body));
});

router.get('/', function(request, response){
  response.send(findAllPagesForWebsite(request.params.websiteId));
});

router.get('/:pageId', function(request, response){
  let page = findPageById(request.params.pageId);
  if (_.isUndefined(page)) return response.status(404).send('not found')
  // response.send(findPageById(request.params.pageId));

  response.send(page)
});

router.put('/:pageId', function(request, response){
  response.send(updatePage(request.params.pageId, request.body))
});

router.delete('/:pageId', function(request, response){
  response.send(deletePage(request.params.pageId));
});

router.use('/:pageId/widget', widgetRouter);

function createPage(websiteId, page){
  page._id = String(Number(_.last(pages)._id) + 1);
  page.websiteId = websiteId;
  pages.push(page);
  return page;
}

function findAllPagesForWebsite(websiteId){
  return _.filter(pages, ['websiteId', websiteId]);
}

function findPageById(pageId){
  return _.find(pages, ['_id', pageId]);
}

function updatePage(pageId, page){
  let page_to_modify = findPageById(pageId);
  _.assign(page_to_modify, page);
  return page_to_modify;
}

function deletePage(pageId){
  return _.remove(pages, (page) => _.isEqual(page._id, pageId));
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
