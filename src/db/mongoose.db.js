const conf = require('./../conf.json');
const mongoose = require('mongoose');

mongoose.connect(
    conf.db.connectionUrlWithDbName,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);
