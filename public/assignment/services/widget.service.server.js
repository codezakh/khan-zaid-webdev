const _ = require('lodash');
const express = require('express');

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  response.send(createWidget(request.params.pageId, request.body));
});

router.get('/', function(request, response){
  response.send(findAllWidgetsForPage(request.params.pageId));
});

router.get('/:widgetId', function(request, response){
  let widget = findWidgetById(request.params.widgetId);
  if (_.isUndefined(widget)) return response.status(404).send('Not found');

  response.send(widget);
});

module.exports.reset = resetData;
module.exports.router = router;

function createWidget(pageId, widget){
  widget._id = String(Number(_.last(widgets)._id) + 1);
  widget.pageId = pageId;
  widgets.push(widget);
  return widget;
}

function findAllWidgetsForPage(pageId){
  return _.filter(widgets, ['pageId', pageId]);
}

function findWidgetById(widgetId){
  return _.find(widgets, ['_id', widgetId]);
}

var widgets = [
  {
    "_id": "123",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 2,
    "text": "GIZMODO"
  },
  {
    "_id": "234",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 4,
    "text": "Lorem ipsum"
  },
  {
    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"
  },
  {
    "_id": "456",
    "widgetType": "HTML",
    "pageId": "321",
    "text": "<p>Lorem ipsum</p>"
  },
  {
    "_id": "567",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 4,
    "text": "Lorem ipsum"
  },
  {
    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://youtu.be/AM2Ivdi9c4E"
  },
  {
    "_id": "789",
    "widgetType": "HTML",
    "pageId": "321",
    "text": "<p>Lorem ipsum</p>"
  }
];

var widgetResetData = _.cloneDeep(widgets)

function resetData(){
  widgets = _.cloneDeep(widgetResetData);
}
