var assert = require('assert')
var db = require('../db')
var ObjectId = require('mongodb').ObjectId

exports.insert = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}

exports.find = function(id, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Find a user
  collection.findOne({'_id': id}, function(err, document) {
    assert.equal(err, null)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.addSearch = function(userId, search, callback){
  console.log('UserId: ', userId)
  console.log('Search: ', search)
  var collection = db.get().collection('users')
  collection.update(
    {'_id': userId},
    {$push:{searchs: search}},
    function(err, result){
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('Added a Search')
      callback(result)
    })
}

exports.removeSearch = function(userId, search, callback){
  var collection = db.get().collection('users')
  collection.update(
    {'_id': userId},
    {$pull:{searchs: search}},
    function(err, result){
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('Added a Search')
      callback(result)
    })
}

exports.update = function(user, callback){
  //get the users collection
  var collection = db.get().collection('users')
  user._id = ObjectId(user._id)
  //update the user
  collection.update({'_id': user._id}, user, function(err, result){
    assert.equal(err, null)
    assert.equal(1, result.result.n) // how many records were modified
    console.log('Updated 1 document in the users collection')
    callback(result)
  })
}
