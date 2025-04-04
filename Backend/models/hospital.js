/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  website: { type: String },
  authorisedPersonName: { type: String, required: true },
  authorisedPersonDesignation: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;