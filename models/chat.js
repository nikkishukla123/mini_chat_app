const mongoose = require("mongoose");
//here the schema is set
const chatSchema = new mongoose.Schema ({
      from:{
        type:String,
        required:true
      },
      to:{
        type:String,
        required:true
      },
      msg:{
        type:String
      },
      created_at:{
        type:Date,
        required:true
      },

})
const Chat = mongoose.model("Chat",chatSchema);
module.exports= Chat;  // exporting it to the main index file
