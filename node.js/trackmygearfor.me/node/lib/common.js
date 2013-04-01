var buffer = exports.buffer = require('buffer')

// npm modules
exports.connect = require('connect')
exports.uuid = require('node-uuid')
exports.mongodb = require('mongodb')

exports.dispatch   = require('dispatch')
exports.everyauth  = require('everyauth')
exports.twitter    = require('twitter')
exports.facebook   = require('facebook-client')

exports.DataCapsule = require('data-capsule')


exports.config = require('./config.mine')
exports.sendjson = function(res, obj) {
	var objstr = JSON.stringify(obj)
	console.log('SENDJSON:' + objstr);
	res.writeHead(200, {
		'Content-Type' : 'application/json',
		'Cache-Control' : 'private, max-age=0, no-cache, no-store',
		"Content-Length" : buffer.Buffer.byteLength(objstr)
	})

	res.end(objstr)
}

var util = {}

util.sendjson = function(res,obj) {
  var objstr = JSON.stringify(obj)
  res.writeHead(200,{
    'Content-Type': 'application/json',
    'Cache-Control': 'private, max-age=0, no-cache, no-store',
    "Content-Length": buffer.Buffer.byteLength(objstr) 
  })
  res.end( objstr )
}

util.sendcode = function(res,code,msg) {
  res.writeHead(code,msg)
  res.end()
}

util.err = function( res, win ) {
  return function( err, data ) {
    if( err ) {
      util.sendcode(res, 500)
      console.log(err)
    }
    else {
      win( data ) 
    }
  }
}

util.found = function( res, win ) {
  return function( item ) {
    if( item ) {
      win( item ) 
    }
    else util.sendcode(res, 404)
  }
}

util.senditem = function( res, item ) {
  return function( item ) {
    util.sendjson(res,item)
  }
}


exports.util = util