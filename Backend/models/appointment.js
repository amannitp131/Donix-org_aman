
/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Name of the person
  organ: { type: String, required: true },       // Organ related to the appointment
  formLink: { type: String, required: true },    // Form link for the appointment
  hospitalId: { type: String, required: true },  // Hospital ID from the headers
  createdAt: { type: Date, default: Date.now },  // Automatically set the creation date
  userId : { type: String, required: true },
  isVerified : {type:Boolean, default:false},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;