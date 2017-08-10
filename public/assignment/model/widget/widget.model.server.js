const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../../../test/app').db;
const pageModel = require('../page/page.model.server');
const widgetSchema = require('./widget.schema.server');

const widgetModel = mongoose.model('widgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;


function createWidget(pageId, widget) {
  widget._page = pageId;
  widget.pageId = pageId;
  let widgetPersisted;
  return widgetModel.create(widget)
    .then((createdWidget) => {
      widgetPersisted = createdWidget;
      pageModel.addWidgetToPage(pageId, createdWidget)
    })
    .then((widgetSaved) => {
      return widgetModel.findOne(widgetPersisted._id)
    });
};

function findWidgetById(widgetId) {
  return widgetModel.findOne({_id: widgetId});
}

function findAllWidgetsForPage(pageId){
  return widgetModel.find({_page: pageId});
};

function updateWidget(widgetId, widget){
  return widgetModel.update({_id: widgetId}, {$set: widget})
    .then((unused) => {
      return widgetModel.findOne({_id: widgetId});
    });
};

function deleteWidget(widgetId) {
  return widgetModel.findOneAndRemove({_id: widgetId});
}

module.exports = widgetModel;