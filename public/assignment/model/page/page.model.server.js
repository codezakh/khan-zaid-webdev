const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../../../test/app').db;
const websiteModel = require('../website/website.model.server');
const pageSchema = require('./Page.schema.server');

const pageModel = mongoose.model('pageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForwebsite = findAllPagesForWebsite;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

function createPage(websiteId, page) {
  page._website = websiteId;
  page.websiteId = websiteId;
  return pageModel.create(page)
    .then((createdPage) => {
      websiteModel.addPageToWebsite(websiteId, createdPage)
    })
    .then((pageSaved) => {
      return pageModel.findOne(page._id)
    })
};

function findPageById(pageId) {
  return pageModel.findOne({_id: pageId});
};

function findAllPagesForWebsite(websiteId){
  return pageModel.find({_website: websiteId});
};

function updatePage(pageId, page){
  return pageModel.update({_id: pageId}, {$set: page})
    .then((unused) => {
      return pageModel.findOne({_id: pageId});
    });
};

function deletePage(pageId) {
  return pageModel.findOneAndRemove({_id: pageId});
};



module.exports = pageModel;
