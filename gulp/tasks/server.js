'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');
var url     = require('url');
var Flutter = require('flutter');
var twitterInit = '/login/twitter';
var twitterCallback = 'http://dev.stationlocal.com:3001/feed';

gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.buildDir));
  var sessionConf = {
      store: new RedisStore(),
      secret: "stationLocal-hjsdkfhlasdfjl",
      cookie: {}
  }
  server.use(session(sessionConf))

  var flutter = new Flutter({
    debug: function(msg){ console.log(msg) },

    consumerKey: 'HYZ4IPNpj9odSfglAqPBSwhCa',
    consumerSecret: 'SsFMuffHWuCdCjQb4dsj6unfU8SWHYGI4qPCjpqeaksh9fuKoh',
    loginCallback: twitterCallback,
   
    authCallback: function(req, res, next) {
      if (req.error) {
         // Authentication failed, req.error contains details 
         return;
      }
       
      var accessToken = req.session.oauthAccessToken;
      var secret = req.session.oauthAccessTokenSecret;
   
   // console.log('accessToken '+accessToken);
   // console.log('secret '+secret);

      // Store away oauth credentials here 
   
      // Redirect user back to your app 
      res.redirect(twitterCallback);
    }
  });

  // Direct users to /login/twitter to initiate oauth flow. 
  server.get(twitterInit, function(req, res) {
    if (!req.session) {
      req.session = {}
    }
    flutter.connect(req, res)
  });
         
  // URL used in loginCallback above 
  server.get(twitterCallback, flutter.auth);

  // Serve index.html for all routes to leave routing up to react-router
  server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port ' + config.serverport);
    }
    else {
      throw err;
    }
  });

  s.listen(config.serverport);

});