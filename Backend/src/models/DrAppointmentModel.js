const mongoose = require("mongoose");

const appointmentDetailszSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userDetails: {
    type: Object,
    required: true,
  },
  reqAccepted: {
    type: Boolean,
    default: false,
  },
  checkupDone: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: false,
  },
  date:{
    type:String,
    default:false,
  }
});

const appointmentSchema = new mongoose.Schema({
  drId: {
    type: String,
    required: true,
  },
  appointmentDetails: [appointmentDetailszSchema],
});

const AppointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

module.exports = AppointmentModel;
