const bcrypt = require('bcrypt')
const {IMPROPER_REQUEST,ERROR,SUCCESS,} = require("./constants.js");

function hash(pass, rounds = 10){
    return new Promise((resolve,reject)=>{
        if(!pass)
            reject({ status: IMPROPER_REQUEST, payload: 'password is required' });
        bcrypt.hash(pass, rounds, function (err, hash) {
          if(err)
            reject({status: ERROR, payload: `error while hash: ${err}`})
          else 
            resolve({ status: SUCCESS, payload: hash });
        });
    })
}

function compare(pass,hash){
    bcrypt.compare(pass, hash, function (err, result) {
        if (!pass || !hash)
          reject({ status: IMPROPER_REQUEST, payload: "password and hash are required" });
        if (err)
          reject({ status: ERROR, payload: `error while compare: ${err}` });
        else resolve({ status: SUCCESS, payload: result });
    });
}