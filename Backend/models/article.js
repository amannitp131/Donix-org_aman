/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  isSensitive: { type: String, required: true,default:false },
  donationLink:{type: String ,required:true},
  addedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
},
createdAt: { type: Date }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;