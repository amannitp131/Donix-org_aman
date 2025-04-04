/* eslint-disable @typescript-eslint/no-require-imports */

const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    link: String,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false // Set default value for isVerified
    }
});

const Webinar = mongoose.model("Webinar", webinarSchema);
module.exports=Webinar;
