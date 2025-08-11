const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  //this user will act as a foreign key in user and matching user id and display that user notes 
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true
  },
  tag:{
    type: String,
    default: "General"
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', NotesSchema);