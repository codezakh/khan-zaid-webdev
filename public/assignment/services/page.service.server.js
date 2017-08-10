const _ = require('lodash');
const express = require('express');
const widgetRouter = require('./widget.service.server').router;
const pageModel = require('../model/page/page.model.server');

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  pageModel.createPage(request.params.websiteId, request.body)
    .then((createdPage) => {
      response.send(createdPage);
    });
});

router.get('/', function(request, response){
  pageModel.findAllPagesForwebsite(request.params.websiteId)
    .then((foundPages) => {
      response.send(foundPages);
    });
});

router.get('/:pageId', function(request, response){
  pageModel.findPageById(request.params.pageId)
    .then((foundPage) => {
      if(foundPage) {
        response.send(foundPage);
      } else {
        response.status(404).send('not found')
      }
    });
});

router.put('/:pageId', function(request, response){
  pageModel.updatePage(request.params.pageId, request.body)
    .then((updatedPage) => {
      response.send(updatedPage);
    });
});

router.delete('/:pageId', function(request, response){
  pageModel.deletePage(request.params.widgetId)
    .then((pageDeleted) => {
      response.send('page deleted')
    });
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
  pageModel.deletePage(pageId)
    .then((pageDeletedSuccessfully) => {
      response.send('page deleted')
    });
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
