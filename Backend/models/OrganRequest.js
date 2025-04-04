/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const organRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User making the request
  hospitalId: { type: String, required: true }, // Hospital providing the organ
  organ: { type: String, required: true }, // Organ requested
  requestedAt: { type: Date, default: Date.now }, // Timestamp of the request
  isVerified:{type:Boolean,default:false}
});

const OrganRequest = mongoose.model("OrganRequest", organRequestSchema);

module.exports = OrganRequest;