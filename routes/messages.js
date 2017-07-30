var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message.find()
   .populate('user', 'firstName')
   .exec()
   .then(function(result) {
      console.log('no error from mongo');
      res.status(200).json({
          title: 'Success',
          obj: result
        });
      })
   .catch(function(err){
      console.log('Received error from mongo');
      return res.status(500).json({
         title: 'Error getting messages',
         error: err
       });
     });
   });

router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, data) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  })
});

router.post('/', function (req, res, next) {
      var decoded = jwt.decode(req.query.token);
      User.findById(decoded.user._id, (err, user) => {
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        const message = new Message({
          content: req.body.content,
          user: user
        });
        message.save(function(err, result) {
          if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
          }
          user.messages.push(result);
          user.save();
          res.status(201).json({
            message: 'Message was saved',
            obj: result
          });
        });
      });
    });

router.patch('/:id', (req, res, next) => {
  var decoded = jwt.decode(req.query.token)
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.content = req.body.content;
    message.save((err, result) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  var decoded = jwt.decode(req.query.token)
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No message found',
        error: {message: 'Message not found'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.remove((err, result) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    });
  });
});

module.exports = router;
