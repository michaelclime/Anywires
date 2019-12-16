const express = require('express'),
    router = new express.Router(),
    mongo = require('mongodb'),
    objectId = require("mongodb").ObjectID,
    jsonParser = express.json(),
    Merchant = require("../modules/merchant"),
    Settlement = require('../modules/settlement'),
    Wallet = require("../modules/wallet");
 

const url = 'mongodb://18.216.223.81:27017/anywires';

router.get('/wallets', isLoggedIn, function(req, res) {
    res.render("wallets.html");
});


// @route POST /getWalletsPart
// @desc Get 10 Wallets and count them, also you can use filter
router.post('/getWalletsPart', jsonParser, async (req, res) => {
    const filter = req.body.filter;
    const number = req.body.number;
    const limit = req.body.limit;
    let resObj = {};

    // Get 10 wallets
    Wallet
    .find(filter, async (err, wallets) => {
        if (err) return res.send("Error with get part Wallets!");
        resObj["wallets"] = wallets;
        
        // Get number of wallets
        resObj["counts"] = await Wallet.countDocuments(filter);
        res.send(resObj);
    })
    .sort({_id:-1})
    .skip(number)
    .limit(limit);
});

// @route POST /getWalletById
// @desc Get one Wallet by _id
router.post("/getWalletById", jsonParser, (req, res) => {
    Wallet
    .find({"_id": new objectId(req.body.id)}, (err, wallet) => {
        if (err) return res.send("Error with get wallet by id!");
        res.send(wallet);
    });
});

// @route POST /editWallet
// @desc Edited one Wallet
router.post("/editWallet", jsonParser, (req, res) => {
    const walletId = req.body.walletId;
    const editedWallet = req.body.editedWallet;
    Wallet.updateOne({"_id": new objectId(walletId)}, {$set: editedWallet}, 
    {returnOriginal: false}, (err, bank) => {
        if(err) return console.log("Error witch changing Wallet Data!", err);  
        res.send("Wallet has been changed successfully!")
    });
});

// @route POST /createWallet
// @desc Insert New Wallet
router.post("/createWallet", jsonParser, (req, res) => {
    const newWallet = req.body.newWallet;
    newWallet["creation_date"] = new Date();
    new Wallet(newWallet).save()
    .then( async (newWallet) => {
        if (newWallet.type === "AW Wallet") {
            try {
                await Merchant.updateOne({"name": newWallet.merchant_name}, {$push: {"inside_wallets": newWallet._id}});
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                await Merchant.updateOne({"name": newWallet.merchant_name}, {$push: {"wallets": newWallet._id}});
            } catch (e) {
                console.log(e);
            }
        }
    })
    .then(() => {
        res.send("Wallet has been created successfully!");
    });
});


// @route GET /get-settlement-by-wallet/:id
// @desc Take one settlement
router.get('/get-settlement-by-wallet/:id', async (req, res) => {
    const walletId = new objectId(req.params.id);
    const settlements = await Settlement.aggregate([
        { $match : { wallets : walletId } },
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
                foreignField: "_id",  // field in the merchants  collection
                as: "mercName"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: 'created_by',    // field in the settlements collection
                foreignField: "_id",  // field in the users collection
                as: "createdBy"
            }
        }
    ]).sort({_id:-1});
    res.send({
        settlements
    });
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/');
};

module.exports = router;