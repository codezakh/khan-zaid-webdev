const _ = require('lodash');
const express = require('express');

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  response.send(createWebsite(request.params.userId, request.body));
});

router.get('/', function(request, response){
  response.send(findAllWebsitesByUser(request.params.userId));
});

router.get('/:websiteId', function(request, response){
  response.send(findWebsiteById(request.params.websiteId));
});


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
