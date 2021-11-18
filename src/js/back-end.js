//import mongodb
var mongodb = require("mongodb");
var ObjectIddd = require("mongodb").ObjectId;

//import body-parser 
var bodyparser = require('body-parser')

//mongodb server url
var url = "mongodb://127.0.0.1:27017";

//mongo db create collection
var dbo;
mongodb.connect(url, (err, db) => {
    dbo = db.db("StudentList");
    dbt = db.db("TeacherList");
})

//import express.js
const express = require("express");
const { ObjectID, ObjectId } = require("mongodb");

//declare express.js function
const app = express();

//cors permissions
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,\Authorization');
    next();
});

//body-parser 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


//POST
app.post('/POSTstudent', (req, res) => {
    mongodb.connect(url, (err, db) => {
        var record = req.body;
        console.log("-----", req.body)
        dbo.collection("StudentList").insertOne(record, function (err, ress) {
            res.send({ 'success': true, 'message': 'Saved Successfully' })
            console.log("inserted")
        })
    })
})

app.post('/POSTteacher', (req, res) => {
    mongodb.connect(url, (err, db) => {
        var record = req.body;
        console.log("-----", req.body)
        dbt.collection("TeacherList").insertMany(record, function (err, ress) {
            res.send({ 'success': true, 'message': 'Saved Successfully' })
            console.log("inserted")
        })
    })
})


//GET
app.get('/GETstudent', (req, res) => {
    mongodb.connect(url, (err, db) => {
        dbo.collection("StudentList").find(req.query).toArray(function (err, ress) {
            res.send({ 'success': true, "data": ress })
        })
    })
})

app.get('/GETteacher', (req, res) => {
    mongodb.connect(url, (err, db) => {
        dbt.collection("TeacherList").find(req.query).toArray(function (err, ress) {
            res.send({ 'success': true, "data": ress })
        })
    })
})


//Delete 
app.delete('/DELETEstudent', (req, res) => {
    var record = req.query.id;
    var searchrecord = new ObjectIddd(record)
    dbo.collection("StudentList").deleteOne({ _id: searchrecord }, function (err, drop) {
        res.send({ 'success': true, "message": "Succesfully Deleted All", "data": drop })

    })

})

app.delete('/DELETEteacher', (req, res) => {
    var record = req.query.id;
    var searchrecord = new ObjectIddd(record);
    console.log(searchrecord)
    dbt.collection("TeacherList").deleteOne({ _id: searchrecord }, function (err, drop) {
        res.send({ 'success': true, "message": "Succesfully Deleted All", "data": drop })

    })

})


//Delete All
app.delete('/DELETEALLstudent', (req, res) => {
    dbo.collection("StudentList").drop(function (err, drop) {

        res.send({ 'success': true, "message": "Succesfully Deleted All", "data": drop })

    })

})


//localthost server initialize
app.listen(3000)
