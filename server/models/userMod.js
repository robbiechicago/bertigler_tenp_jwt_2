var mongoose = require('mongoose');

var date = new Date();
var strDate = date.toString()

var User = mongoose.Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: false},
  salt: {type: String, required: false},
  tps_id: {type: Number, required: false, default: null},
  is_admin: {type: Number, required: true, min: 0, max: 1, default: 0},
  status: {type: Number, required: true, min: 0, max: 1, default: 1},
  date_created: {type: Date, required: true, default: strDate},
  date_updated: {type: Date, required: false, default: null},
  update_by: {type: Number, required: false}
})


module.exports = mongoose.model('User', User);