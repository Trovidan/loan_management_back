const db = require('../../config/db.js');
const { ERROR } = require('../../utility/constants.js');

function connectdb(req,res,next){
    db.connect().then(result=>{
        next();
    }).catch(err=>{
        if(err.status)
            res.status(err.status).send(err);
        else
            res.status(ERROR).send({status:ERROR, payload: "Error while connecting to db"});
    })
}

module.exports = connectdb