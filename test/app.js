var app = require('../express');

app.get("/api/test", findAllMessages);
app.post("/api/test", createMessage);
app.delete("/api/test/:id", deleteMessage);

var connectionString = 'mongodb://127.0.0.1:27017/test';

console.log("Logs show up");
if(process.env.MLAB_USERNAME) {
    var username = process.env.MLAB_USERNAME;
    var password = process.env.MLAB_PASSWORD;
    var mongo_uri = process.env.MLAB_CONNSTR;
    console.log(username + password + mongo_uri);
    connectionString = "mongodb://" + username + ":" + password + "@" + mongo_uri;
    console.log(connectionString);
}

var mongoose = require("mongoose");
const db = mongoose.connect(connectionString);
module.exports.db = db;

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

function findAllMessages(req, res) {
    TestModel
        .find()
        .then(
            function(tests) {
                res.json(tests);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function createMessage(req, res) {
    TestModel
        .create(req.body)
        .then(
            function(test) {
                res.json(test);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function deleteMessage(req, res) {
    TestModel
        .remove({_id: req.params.id})
        .then(
            function(result) {
                res.json(result);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}
