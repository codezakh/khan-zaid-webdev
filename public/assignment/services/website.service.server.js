const _ = require('lodash');
const express = require('express');
const pageRouter = require('./page.service.server').router;
const websiteModel = require('../model/website/website.model.server');
let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  websiteModel.createWebsite(request.params.userId, request.body)
    .then((createdWebsite) => {
      response.send(createdWebsite);
    });
});

router.get('/', function(request, response){
  websiteModel.findAllWebsitesForUser(request.params.userId)
    .then((foundWebsites) => {
      response.send(foundWebsites)
    });
});

router.get('/:websiteId', function(request, response){
  websiteModel.findWebsiteById(request.params.websiteId)
    .then((foundWebsite) => {
      if (foundWebsite){
        response.send(foundWebsite)
      } else {
        response.status(404).send('not found');
      }
    });
});

router.put('/:websiteId', function(request, response){
  websiteModel.updateWebsite(request.params.websiteId, request.body)
    .then(function(updatedWebsite){
      response.send(updatedWebsite)
    });
  // response.send(updateWebsite(request.params.websiteId, request.body));
});

router.delete('/:websiteId', function(request, response){
  websiteModel.deleteWebsite(request.params.websiteId)
    .then((websiteDeletedSucessfully) => {
      response.send('website deleted');
    });
});

router.use('/:websiteId/page', pageRouter)


module.exports.router = router;


function createWebsite(userId, website){
  website._id = String(Number(_.last(websites)._id) + 1);
  website.developerId = userId;
  websites.push(website);
  return website;
};

function findAllWebsitesByUser(userId){
  return _.filter(websites, ['developerId', userId]);
};

function findWebsiteById(websiteId){
  return _.find(websites, ['_id', websiteId]);
}

function updateWebsite(websiteId, website){
  let website_to_modify = findWebsiteById(websiteId);
  _.assign(website_to_modify, website);
  return website_to_modify;
}

function deleteWebsite(websiteId){
  return _.remove(websites, (website) => _.isEqual(website._id, websiteId));
}



var websites = [
  {
    "_id": "123",
    "name": "Facebook",
    "developerId": "456",
    "description": "Lorem"
  },
  {
    "_id": "234",
    "name": "Tweeter",
    "developerId": "456",
    "description": "Lorem"
  },
  {
    "_id": "456",
    "name": "Gizmodo",
    "developerId": "456",
    "description": "Lorem"
  },
  {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
  {
    "_id": "567",
    "name": "Tic Tac Toe",
    "developerId": "123",
    "description": "Lorem"
  },
  {
    "_id": "678",
    "name": "Checkers",
    "developerId": "123",
    "description": "Lorem"
  },
  {
    "_id": "789",
    "name": "Chess",
    "developerId": "234",
    "description": "Lorem"
  }
];

var _websiteResetData = _.cloneDeep(websites);

let resetData = function resetData(){
  websites = _.cloneDeep(_websiteResetData);
};

module.exports.reset = resetData;
