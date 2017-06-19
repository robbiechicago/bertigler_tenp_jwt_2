var User = require('../models/userMod');
var bodyParser = require('body-parser');
var Crypto = require('crypto-js');
var jwt = require('jsonwebtoken');



//USER STATUS
function getUserStatus(req, res) {
  console.log('getUserStatus fired')
  var sesh = req.session
  console.log(sesh)
  console.log(req.user)
  if (req.user) {
    console.log(req.user)
    return res.status(200).json({
      logged_in: true
    })
  }
  res.status(200).json({
    logged_in: false
  })
}

//VALIDATE JWT
function validate_jwt(token) {
  jwt.verify(token, 'testing', function(err, verified_token) {
    console.log('verified_token')
    console.log(verified_token)
    
    if(err) return { message: 'Invalid token. ' + err };
    
    return { token: verified_token };
  })
}

//INDEX
function getAllUsers(req, res) {
  User.find(function (err, users) {
    if(err) res.json({ message: 'Could not find any users. ' + err });

    res.json({ users: users });
  })
}


// POST /login 
function loginUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if(user) {
        var salt = user.salt;
        var salted_hashed_password = Crypto.SHA256(salt + password).toString();
        if (salted_hashed_password == user.password) {
          console.log('GET THE FUCK IN!')
          var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            valid: true,
            username: user.username, 
            is_admin: user.is_admin
          }, 'testing');
          jwt.verify(token, 'testing', function(err, verified_token) {
            if (err) {
              res.json({ message: 'Invalid token' + err })
            } else {
              verified_token.token_status = 'logged_in';
              var return_obj = {
                _id: user._id,
                username: user.username,
                email: user.email,
                status: user.status,
                is_admin: user.is_admin,
                token: token,
                validation: verified_token
              }
              res.json({
                type: true,
                data: return_obj
              }); 
            }
          })
        } else {
          console.log('no dice :-(');
          res.json({
            type: false,
            data: "Incorrect username/password"
          }); 
        }
      } else {
        console.log('no user found')
        res.json({
          type: false,
          data: "user not found"
        })
      }
    }
  });
}

//NEW

function createUser(req, res) {
  console.log(req.body);
  var new_user = new User(req.body)
  User.find({ username: req.body.username }, function(err, user) {
    if(err) res.json({ message: 'something went wrong' + err })

    if(user.username) {
      console.log(user)
      console.log(typeof(user))
      res.json({ message: 'username already exists' });
    } else {
      console.log('got this far...')
      var salt = Date.now();
      crypSalt = Crypto.SHA256(salt.toString() + req.body.username).toString();
      new_user.salt = crypSalt
      new_user.password = Crypto.SHA256(crypSalt + req.body.password).toString();
      new_user.save(function(err) {
        if(err) {
          res.json({ message: 'Could not create user. ' + err });
        } else {
          res.json({ message: 'User successfully created' });
        }
      })
    }
  })
}


//SHOW
function getUserById(req, res) {
  var id = req.params.id;
  User.findById({ _id: id }, function(err, user) {
    if(err) res.json({ message: 'Could not find user. ' + err });

    res.json({ user: user })
  })
}

//EDIT

//UPDATE
function updateUser(req, res) {
  var id = req.params.id;
  User.findById({ _id: id }, function(err, user) {
    if(err) res.json({ message: 'Could not find user. ' + err });

    if(req.body.username) user.username = req.body.username;
    if(req.body.password) user.password = req.body.password;

    user.save(function(err) {
      if(err) res.json({ message: 'Could not update user. ' + err });
      console.log(user);
      res.json({ message: 'User successfully updated' })
    })
  })
}

//DELETE
function removeUser(req, res) {
  var id = req.params.id;
  console.log('WTF? THE DELETE USER FUNCTION JUST GOT FIRED!')
  // User.remove({ _id: id }, function(err) {
  //   if(err) res.json({ message: 'Could not delete user. ' + err });

  //   res.json({ message: 'User successfully deleted' })
  // })
}

//EXPORT
module.exports = {
  getUserStatus: getUserStatus,
  getAllUsers: getAllUsers,
  loginUser: loginUser,
  createUser: createUser, 
  getUserById: getUserById,
  updateUser: updateUser,
  removeUser: removeUser
}