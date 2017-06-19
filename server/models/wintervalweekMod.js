var mongoose = require('mongoose');

var wintervalweekSchema = new mongoose.Schema({
  season: {type: Number, required: true},
  start_monday_of_winterval_week: {type: Date, required: true}
})

var WintervalWeek = mongoose.model('WintervalWeek', wintervalweekSchema);

module.exports = WintervalWeek;