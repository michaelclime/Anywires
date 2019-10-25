const express = require('express'),
    mongo = require('mongodb'),
    objectId = require("mongodb").ObjectID, 
    router = new express.Router(),
    jsonParser = express.json(),
    multer = require("multer"),
    upload = multer({dest:"uploads"}),
    Invoice = require('../modules/invoice'),
    Merchant = require('../modules/merchant'),
    Wallet = require('../modules/wallet'),
    Settlement = require('../modules/settlement'),
    assert = require('assert');

const url = 'mongodb://18.216.223.81:27017/anywires';

router.get('/settlements.html', isLoggedIn, function(req, res) {
    res.render("settlements.html");
});

router.get('/settlementReport.html', isLoggedIn, function(req, res) {
    res.render("settlementReport.html");
});

router.get('/settlementPreview.html', isLoggedIn, function(req, res) {
    res.render("settlementPreview.html");
});

router.get('/availableInvs/:merchant', async function(req, res, next) {
    let INVOIECES = [];
     mongo.connect(url, function(err, db) {
        db.collection('merchants').findOne(objectId(req.params.merchant)).then(
            (result) => {
                mongo.connect(url, function(err, db) {
                    assert.equal(null, err);
                    var cursor = db.collection('invoices').find({ 'status': 'Available',
                                                                'merchant': result.name,
                                                                settleSelectedStatus: false } );
                    cursor.forEach(function(doc, err) {
                        assert.equal(null, err);
                        INVOIECES.push(doc);
                    }, function() {
                        db.close();
                        res.send(INVOIECES);
                    });
                });
            });
    });
});

router.get("/getWalletsList/:id", async (req, res) => {

    const merchant = await Merchant.findById(req.params.id);
    
    const getList = async () => {
        let walletList =[];

        // merchant.wallets.forEach(async (i) => {
        //     let wallet = await Wallet.findById(i);
        //     walletList.push(wallet);
        // });

        for (let i = 0; i < merchant.wallets.length; i += 1) {
            let wallet = await Wallet.findById( merchant.wallets[i] );
            walletList.push(wallet);
        }

        return walletList;
    };

    getList().then( (result) => {
        res.status(200).send(result);
    }).catch((err) =>{
        res.status(400).send(err);
        console.log(err);
    })
});

router.get("/getInside_walletsList/:id", async (req, res) => {

    const merchant = await Merchant.findById(req.params.id);
   
    const getList = async () => {
        let walletList =[];

        for (let i = 0; i < merchant.inside_wallets.length; i += 1) {
            let wallet = await Wallet.findById( merchant.inside_wallets[i] );
            walletList.push(wallet);
        }
        return walletList;
    };

    getList().then( (result) => {
        res.status(200).send(result);
    }).catch((err) =>{
        res.status(400).send(err);
        console.log(err);
    })
});

router.get("/getSettlementsList", (req, res) => {
    mongo.connect(url, function(err, db) {
        db.collection('settlements').aggregate([
            {
            $lookup: {
                from: "wallets",
                localField: "wallets",    // field in the settlements collection
                foreignField: "_id",  // field in the wallets collection
                as: "wallet"
            }
            }, {
                $lookup: {
                    from: "documents",
                    localField: 'documents',    // field in the settlements collection
                    foreignField: "_id",  // field in the documents collection
                    as: "documentList"
                }
            }, {
                $lookup: {
                    from: "commissions",
                    localField: 'commissions',    // field in the settlements collection
                    foreignField: "_id",  // field in the commissions  collection
                    as: "commissionsList"
                }
            }, {
                $lookup: {
                    from: "merchants",
                    localField: 'merchant',    // field in the settlements collection
                    foreignField: "_id",  // field in the commissions  collection
                    as: "mercName"
                }
            }
        ]).toArray(function(err, settlements) {
            if (err) throw err;
            res.send(settlements.reverse());
            db.close();
        });
    });
});

router.post('/addSettleComment/:id', jsonParser,  function(req, res) {
    let newComment = {
        created_by: req.body.created_by,
        creation_date: req.body.creation_date,
        message: req.body.message
    };
    mongo.connect(url, (err, db) => {
        db.collection("settlements").findOneAndUpdate( {
             _id: new objectId(req.params.id)
        }, {
            $push: {comments: newComment}
        });
    });
});

router.post('/addSettleCommision/:id', jsonParser,  function(req, res) {
    let newID =  objectId();

    mongo.connect(url, (err, db) => {
        db.collection("commissions").insertOne( {
            _id: newID,
            created_by: req.body.created_by, 
            amount: req.body.amount,
            type: req.body.type,
            percentage: ''
        });
    });

    mongo.connect(url, (err, db) => {
        db.collection("settlements").findOneAndUpdate( {
             _id: new objectId(req.params.id)
        }, {
            $push: {commissions: newID}
        });
    });
});

router.post('/changeSettleStatus/:id', jsonParser,  function(req, res) {
    
    mongo.connect(url, (err, db) => {
        if (req.body.sent_date) {
            db.collection("settlements").findOneAndUpdate( {
                _id: new objectId(req.params.id)
            }, { $set: { 
                    "status": req.body.newStatus,
                    "dates.sent_date":  req.body.sent_date
                }         
            });
        } else  if (req.body.received_date) {
            db.collection("settlements").findOneAndUpdate( {
                _id: new objectId(req.params.id)
            }, { $set: { 
                    "status": req.body.newStatus,
                    "dates.received_date":  req.body.received_date
                }         
            });
        } else {
            db.collection("settlements").findOneAndUpdate( {
                _id: new objectId(req.params.id)
            }, { $set: { 
                    "status": req.body.newStatus,
                    "dates.declined_date":  req.body.declined_date
                }         
            });
        }
    });
});

router.post("/uploadSettleDoc", upload.single("file"), jsonParser, (req, res) => {
   
    let file = req.file;
    if(!file) return res.send("Error to download file");

    const newID = new objectId();

    const newDoc = {
        "_id": newID,
        "type": req.body.type,
        "status": "Non-Verified",
        "filename": req.file.filename,
        "creation_date": new Date(),
        "creator": req.body.creator,
        "originalname": req.file.originalname,
        "encoding": req.file.encoding,
        "mimetype": req.file.mimetype,
        "size": req.file.size
    };
    
     mongo.connect(url, (err, db) => {
        db.collection("documents").insertOne(newDoc, (err) => {
            if (err) return console.log(err, "Error with inseerting Document!");

            mongo.connect(url, (err, db) =>{
                if(err) return console.log(err);  
        
                db.collection("settlements").findOneAndUpdate(
                    {"_id": new objectId(req.body.numberID)},
                    {$push: 
                        { documents: newID}
                    },
                    {returnOriginal: false }, function(err, result){
        
                    if(err) return console.log(err);  
                    res.status(200).send("Document successfully has been uploaded!");
               });
            });
        })
    });
});

router.post('/creatSettle/:id', async (req, res) => {

    let amounts = [];
    let invoices = [];
    let currency, merchantID;
    if (Array.isArray(req.body.invoices)) {
        req.body.invoices.forEach((i) => {
            let infoArr = i.split('/');
            amounts.push(infoArr[0]);
            invoices.push( objectId(infoArr[2]) );
            currency = infoArr[1];
            merchantID = infoArr[3];
        });
    } else {
        let infoArr = req.body.invoices.split('/');
            amounts.push(infoArr[0]);
            invoices.push( objectId(infoArr[2]) );
            currency = infoArr[1];
            merchantID = infoArr[3];
    }
    
    let wallet = await Wallet.findById(req.body.wallets);

    const reducer = (accumulator, currentValue) => +accumulator + +currentValue;
    let totalSumInv = amounts.reduce(reducer);
    let newSettle = {
        dates: {
            creation_date: new Date()
        },
        amount: totalSumInv,
        currency:  currency,
        merchant: objectId(merchantID),
        status: 'Requested',
        invoices: invoices,
        type: wallet.type,
        created_by: objectId(req.params.id),
        wallets: [
            objectId(req.body.wallets)
        ]
    }

    const settlement = new Settlement(newSettle);

    for (let i = 0; i < invoices.length; i += 1) {
        let newStatusInv = await Invoice.findByIdAndUpdate(invoices[i], {
            settleSelectedStatus: true
        });
    }

    try {
        await settlement.save();
        req.flash('success', 'Settlement successfully created!');
        res.status(201).redirect("/settlements.html");
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }

   
});

router.post('/creatSettleFromAwWallet/:id', async (req, res) => {
   
    let newSettle = {
        dates: {
            creation_date: new Date()
        },
        amount: req.body.amountPaymentfromAW,
        currency:  req.body.currency,
        merchant: objectId(req.body.merchantID),
        status: 'Requested',
        invoices: [],
        type: req.body.type,
        created_by: objectId(req.params.id),
        wallets: [
            objectId(req.body.wallet)
        ]
    };

    const settlement = new Settlement(newSettle);

    try {
        await settlement.save();
        req.flash('success', 'Settlement successfully created!');
        res.status(201).redirect("/settlements.html");
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }  
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/');
}
    
module.exports = router;
