const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
   .then((res) => {
    console.log("connection successful")
   })
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }
 
  const chats = [
    {
      from: "neha",
      to: "papa",
      msg: "kaise ho aap",
      created_at: new Date(),
    },
    {
      from: "pankaj",
      to: "seema",
      msg: "main theek hoon beta",
      created_at: new Date(),
    },
    {
      from: "sadhguru",
      to: "nikki",
      msg: " i am always with you",
      created_at: new Date(),
    },
    {
      from: "maa",
      to: "neha",
      msg: "aaj rajma chawal",
      created_at: new Date(),
    },
    {
      from: "rahul",
      to: "neha",
      msg: "kal college aa rahi ho?",
      created_at: new Date(),
    },
    {
      from: "nikhil",
      to: "bhoot",
      msg: "haan kal milte hain",
      created_at: new Date(),
    }
  ];
  

 Chat.insertMany(chats)
    .then((res) => {
        console.log("message inserted succesfully");
        console.log(res);
    })
    .catch((err) => {
        console.log(err)
    })