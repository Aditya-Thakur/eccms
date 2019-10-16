const express = require('express');
const mongoose = require('mongoose');
const ecc = mongoose.model('ECC');
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/ECCDB');

router.get('/getAllEcc', (req, res) => {
    ecc.find((err, docs) => {
        if(!err){
        res.json(docs);
    } else {
            console.log('Error in retrieving ecc list: ' + err);
        }
    });
});

router.post('/insertECC', (req, res) => {
    insertNewEcc(req, res);
});


function insertNewEcc(req, res){
    var eccNew = new ecc(); 
    eccNew.eccNo = req.body.eccNo;
    eccNew.noOfRooms = req.body.noOfRooms; 
    eccNew.save((err, doc) => {
        if(!err){
            res.json('New ECC Record Inserted - ECC No. '+ req.body.eccNo + ' . No. of rooms - ' + req.body.noOfRooms + '.');
        } else {
            console.log('Error during ECC record insertion: ' + err);
        }
    });
}

module.exports = router; 