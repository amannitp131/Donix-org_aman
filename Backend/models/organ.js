/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const organSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true }, // Hospital name stored as a string
  hospitalId: { type: String, required: true },   // Hospital ID stored as a string
  organ: { type: String, required: true },       // Name of the organ
  count: { type: Number, required: true },       // Number of organs available
  price: { type: Number, required: true },       // Price of the organ
  bloodGroup: { type: String, required: true },  // Compatible blood group
});

const Organ = mongoose.model("Organ", organSchema);

module.exports = Organ;