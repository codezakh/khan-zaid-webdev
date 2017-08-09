const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../../../test/app').db;
const userModel = require('../user/user.model.server');
const websiteSchema = require('./website.schema.server');

const websiteModel = mongoose.model('websiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPageToWebsite = addPageToWebsite;

function createWebsite(userId, website){
  website._user = userId;
  return websiteModel.create(website)
    .then((createdWebsite) => {
      userModel.addWebsiteToUser(userId, createdWebsite)
    })
    .then((websiteSaved) => {
      return websiteModel.findOne(website._id)
    })
};

function findWebsiteById(websiteId) {
  return websiteModel.findOne({_id: websiteId});
};

function findAllWebsitesForUser(userId) {
  return websiteModel.find({_user: userId});
};

function updateWebsite(websiteId, website) {
  return websiteModel.update({_id: websiteId}, {$set: website})
    .then((unused) => {
      return websiteModel.findOne({_id: websiteId});
    })
};

function deleteWebsite(websiteId) {
  return websiteModel.findOneAndRemove({_id: websiteId});
};

function addPageToWebsite(websiteId, page) {
  return websiteModel.findOne({_id: websiteId})
    .then((foundWebsite) => {
      foundWebsite.pages.push(page._id);
      return foundWebsite.save();
    });
};



module.exports = websiteModel;
