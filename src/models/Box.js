const mongoose = require('mongoose');

//create the table
const Box = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Box", Box);