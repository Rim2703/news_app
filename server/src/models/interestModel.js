const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interests: [{ type: String }],
});

module.exports = mongoose.model('Interest', interestSchema);
