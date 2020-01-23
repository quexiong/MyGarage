const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  carID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "car"
  },
  date: {
    type: Date,
    default: Date.now
  },
  mileage: {
    type: Double,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  cost: {
    type: Double,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = Maintenance = mongoose.model("maintenance", MaintenanceSchema);
