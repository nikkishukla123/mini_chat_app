const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const Chat = require("./models/chat.js"); // . is must

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")

main()
   .then((res) => {
    console.log("connection success ful")
   })
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // await mongoose.connect(process.env.MONGO_URL); // this is done so as to not expose link in github public
  }
  let chat1 = new Chat ({
    from:"neha",
    to:"papa",
    msg:"kaise ho aap",
    created_at: new Date(),
  });
  chat1.save()
    .then((res) =>{
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })





app.listen(8080,(req,res) => {
    console.log("server running on port 8080")
});

app.get("/",(req,res) =>{
     res.send("root is working")
})