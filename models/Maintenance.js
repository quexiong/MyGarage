const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "car"
  },
  date: {
    type: Date,
    default: Date.now
  },
  mileage: {
    type: Number,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = Maintenance = mongoose.model("maintenance", MaintenanceSchema);
