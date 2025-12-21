const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const Chat = require("./models/chat.js"); // . is must

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Parse form data (POST request data from HTML forms)

main()
   .then((res) => {
    console.log("connection success ful")
   })
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // await mongoose.connect(process.env.MONGO_URL); // this is done so as to not expose link in github public
  }
  // let chat1 = new Chat ({
  //   from:"neha",
  //   to:"papa",
  //   msg:"kaise ho aap",
  //   created_at: new Date(),
  // });
  // chat1.save()
  //   .then((res) =>{
  //     console.log(res)
  //   })
  //   .catch((err) =>{
  //     console.log(err)
  //   })


  
  app.get("/",(req,res) =>{
    res.send("root is working")
})
  //index route
  app.get("/chats",  async (req,res) =>{
       let chats =  await Chat.find();
       console.log(chats);
       res.render("index.ejs",{chats});
  })
 
 // make form
   app.get("/chats/new",(req,res) => {
       res.render("form.ejs")
   })
// create route
   app.post("/chats",(req,res) =>{
        let {from,msg,to} = req.body; // here name is used of form
        // inserting in database
        let newchat = new Chat ({
          from:from,
          to:to,
          msg:msg,
          created_at: new Date()
        })

        newchat.save()
           .then((res) => {
            console.log("chart saved")
            console.log(res)
           })
           .catch((err) => {
            console.log(err)
           })
      res.redirect("/chats")
   })

    //edit and update
  app.get("/chats/:id/edit", async (req,res) => {
       let{id} = req.params;
       let post = await Chat.findById(id);
        res.render("edit.ejs",{post})
    })




app.listen(8080,(req,res) => {
    console.log("server running on port 8080")
});


