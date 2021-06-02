const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { ERROR, SUCCESS } = require("../utility/constants.js");

dotenv.config({ silent: process.env.NODE_ENV === "production" });
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5ur8r.mongodb.net/loan_management?retryWrites=true&w=majority`;

function connect(){
  return new Promise((resolve,reject)=>{
      if(mongoose.connection.readyState === 1)
          resolve({status: SUCCESS, payload: "Connected"})
      else if(mongoose.connection.readyState === 2)
          resolve({ status: SUCCESS, payload: "Connecting" }); 
      mongoose.set("useFindAndModify", false);
      mongoose
        .connect(DB_URL, {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((response) => {
          resolve({ status: SUCCESS, payload: "Connected" });
        })
        .catch((error) => {
          resolve({ status: ERROR, payload: `Unable to Connect : ${error}` });
        });
  })
}

function disconnect(){
    if (
      mongoose.connection.readyState === 0 ||
      mongoose.connection.readyState === 3
    )
      resolve({ status: SUCCESS, payload: "disconnected" });
    mongoose.connection.close((error)=>{
        if(error)
            resolve({ status: ERROR, payload: `Unable to disconnect : ${error}` });
        else
            resolve({ status: SUCCESS, payload: "disconnected" });
    })
}

module.exports = {
  connect:connect,
  disconnect: disconnect
}