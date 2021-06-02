const {
  IMPROPER_REQUEST,
  ERROR,
  NO_CONTENT,
  SUCCESS,
  INVALID_REQUEST,
} = require("../constants.js");
const User = require('../../config/models/users.js')

function find_users(filter, projection="", options={}){  
    return new Promise((resolve,reject)=>{
        if (!filter) {
            reject({ status: IMPROPER_REQUEST, payload: "Improper find query" })
        }

        User.find(filter, projection, options,(err,docs)=>{
            if(err){
                reject({status: ERROR, payload: err});
            }
            if(!docs || docs.length == 0){
                resolve({status: NO_CONTENT, payload: []});
            }
            resolve({status: SUCCESS, payload: docs})
        })
    })
}

function create_user(doc){   
    return new Promise((resolve,reject)=>{
      if (!doc) {
          reject({ status: IMPROPER_REQUEST, payload: "Improper User Creation!" })
      }
      find_users({primary_email: doc.primary_email}).then(result => {
          if (result.status == 200) {
              reject({status: INVALID_REQUEST, payload: "User Already Exists! Try to login!" ,details:result})
              return;
          }
          User.create(doc, (err,item)=>{
              if (err || !item) {
                  reject({ status: ERROR, payload: err || "Unable to get any returned item" }); 
                  return;
              }
              resolve({ status: SUCCESS, payload: item})
              return;
          })
      }).catch(err=>{
          reject({status: ERROR, payload: err});
      })
    })
}

function modify_user(filter, updates, options = { runValidators: true, new: true, maxTimeMS: 2000}){
  return new Promise((resolve,reject)=>{
    if(!filter || !updates ){
        reject({ status: IMPROPER_REQUEST, payload: "Improper User Updation!" })
    }
    User.findOneAndUpdate(filter, updates, options, (err,doc)=>{
        if(err || !doc){
            reject({
              status: ERROR,
              payload: err
                ? `Encountered error while Updation! + ${err}`
                : "Fatal error! user is not registered!",
            });
        }
        resolve({ status: SUCCESS, payload: doc});
    })
  })
}

function modify_users(
  filter,
  updates,
  options = { runValidators: true, maxTimeMS: 2000 }
) {
  return new Promise((resolve, reject) => {
    if (!filter || !updates) {
      reject({ status: IMPROPER_REQUEST, payload: "Improper User Updation!" });
    }
    User.updateMany(filter, updates, options, (err, doc) => {
      if (err) {
        reject({
          status: ERROR,
          payload: `Encountered error while Updation! + ${err}`,
        });
      }
      resolve({ status: SUCCESS, payload: doc });
    });
  });
}

function delete_users(filter){
    return new Promise((resolve, reject) => {
      if (!filter) {
        reject({
          status: IMPROPER_REQUEST,
          payload: "Improper User Updation!",
        });
      }
      User.deleteMany(filter, (err, doc) => {
        if (err) {
          reject({
            status: ERROR,
            payload: `Encountered error while deletion! + ${err}`
          });
        }
        resolve({ status: SUCCESS, payload: "Successfully deleted" });
      });
    });
}

module.exports = {
    find_users: find_users,
    create_user: create_user,
    modify_user: modify_user,
    modify_users: modify_users,
    delete_users: delete_users
}