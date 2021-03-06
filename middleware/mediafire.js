"use strict";

var request = require('superagent');
var parseXml = require('xml2js').parseString;

// include local
var config = require('./config');

var url = {
  getSession: "https://www.mediafire.com/api/1.1/user/get_session_token.php",
  postSimpleImage: "http://www.mediafire.com/api/1.1/upload/simple.php",
  getPollUpload: "http://www.mediafire.com/api/1.1/upload/poll_upload.php",
  getFileLink: "http://www.mediafire.com/api/1.1/file/get_links.php"
}


var getUploadedFileDetails = function(response, callback) {
  // medirefire returns XML, and XML is terrible to work with, so we convert to a plain object instead  
  parseXml(response, function(err, text) {

    // fileResult should be 0    
    var fileResult = text.response.doupload[0].result[0];

    // fileKey length should be greater than 0
    var fileKey = text.response.doupload[0].key[0];

    // responseResult should be "Success"
    var responseResult = text.response.result[0];

    // did mediafire report a success and give us back a filekey?
    if (fileResult == 0 && fileKey.length > 0 && responseResult === "Success") {
      // yes!
      var uploadFileResult = {
        fileResult: fileResult,
        fileKey: fileKey,
        responseResult: responseResult
      }

      // return good callback
      callback(null, uploadFileResult);
    } else {
      // return the error callback
      callback("error", null);
    }
  });
}

var uploadFile = function(sessionToken, filepath, callback) {
  // post image to mediafire
  request
    .post(url.postSimpleImage)
    .query({
      session_token: sessionToken
    })
    .attach('image', filepath)
    .end(callback);
};


var getLinkFromQuickKey = function(sessionToken, quickKey, callback) {
  request
    .get(url.getFileLink)
    .query({
      session_token: sessionToken,
      quick_key: quickKey,
      response_format: 'json'
    })
    .end(callback);
}

var getQuickKeyFromFileKey = function(filekey, callback) {
  request
    .get(url.getPollUpload)
    .query({
      key: filekey,
      response_format: 'json'
    })
    .end(callback);
}


var getSession = function(callback) {
  // get mediafire session
  request
    .post(url.getSession)
    .query({
      email: config.mediafire.email
    })
    .query({
      password: config.mediafire.password
    })
    .query({
      application_id: config.mediafire.application_id
    })
    .query({
      signature: config.mediafire.signature_sha
    })
    .query({
      response_format: 'json'
    })
    .send()
    .end(callback);
};


module.exports.upload = function(filepath, callback) {
  // get a mediafire session
  getSession(function(err, res) {
    if (err) throw err;

    var sessionToken = res.body.response.session_token;

    // then upload
    uploadFile(sessionToken, filepath, function(err, res) {
      if (err) throw err;

      // then get the uploaded result detail
      getUploadedFileDetails(res.text, function(err, details) {
        // return back to caller
        callback(err, details);
      });
    });
  });
}


module.exports.getFileLink = function(filekey, callback) {
  // get a mediafire session
  getSession(function(err, res) {
    if (err) throw err;

    var sessionToken = res.body.response.session_token;

    // we need to get the quickkey from our filekey
    getQuickKeyFromFileKey(filekey, function(err, res) {
      if (err) throw err;

      var quickKey = res.body.response.doupload.quickkey;

      if (quickKey.length > 0) {
        // get the link from the quickKey
        getLinkFromQuickKey(sessionToken, quickKey, function(err, res) {
          if (err) throw err;
          var fileLink = res.body.response.links[0].view;
          //yes, success!
          callback(null, fileLink);
        });
      } else {
        //uh oh, callback the error
        callback(err, null);
      }
    }); //getQuickKeyFromFileKey
  }); //getSession
}