const mongoose = require('mongoose');

//create the table
const File = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true
    },
    path:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: {virtuals: true}, //criar a url virtual
    toJSON: {virtuals: true}

  }
);

//criar variavel virtual para o front ende acesar o arquivo
File.virtual('url').get(function(){
  return `http://localhost:3333/files${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model("File", File);