let mongoose = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

let SettlementSchema = new mongoose.Schema({
    dates: {
        creation_date: Date,
        sent_date: Date,
        received_date: Date,
        declined_date: Date
    },
    amount: Number,
    currency: String,
    merchant: String,
    status: String,
    invoices: Array,
    comments: Array,
    wallets: Array,
    commissions: Array,
    type: String,
    documents: Array,
    created_by: ObjectId
});

SettlementSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Settlement', SettlementSchema);