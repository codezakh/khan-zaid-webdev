const _ = require('lodash');
const express = require('express');
const widgetModel = require('../model/widget/widget.model.server');

let router = express.Router({mergeParams: true});

router.post('/', function(request, response){
  widgetModel.createWidget(request.params.pageId, request.body)
    .then((createdWidget) => {
      response.send(createdWidget);
    });
});

router.get('/', function(request, response){
  widgetModel.findAllWidgetsForPage(request.params.pageId)
    .then((foundWidgets) => {
      response.send(foundWidgets);
    });
});

router.get('/:widgetId', function(request, response){
  widgetModel.findWidgetById(request.params.widgetId)
    .then((foundWidget) => {
      if (foundWidget) {
        response.send(foundWidget);
      } else {
        response.status(404).send('widget not found');
      }
    });
});

router.put('/:widgetId', function(request, response){
  widgetModel.updateWidget(request.params.widgetId, request.body)
    .then((updatedWidget) => {
      response.send(updatedWidget);
    });
});

router.delete('/:widgetId', function(request, response){
  widgetModel.deleteWidget(request.params.widgetId)
    .then((widgetDeleted) => {
      response.send('widget deleted');
    })
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

function updateWidget(widgetId, widget){
  let widgetToUpdate = findWidgetById(widgetId);
  _.assign(widgetToUpdate, widget)
  return widgetToUpdate
}

function deleteWidget(widgetId){
  return _.remove(widgets, (widget) => _.isEqual(widget._id, widgetId))
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
