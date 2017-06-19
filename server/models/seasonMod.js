var mongoose = require('mongoose');

var seasonSchema = new mongoose.Schema({
  season: {type: Number, required: true},
  date_of_first_saturday_fixture: {type: Date, required: true},
  date_of_last_saturday_fixture: {type: Date, required: true}
})

var Season = mongoose.model('Season', seasonSchema);

module.exports = Season;