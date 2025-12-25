const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const Chat = require("./models/chat.js"); // . is must
const methodOverride = require("method-override");//acessing method override
const ExpressError = require("./ExpressError");// for asynchronous error handling
// const wrapAsync = require("./wrapAsync");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); // Parse form data (POST request data from HTML forms)
app.use(methodOverride("_method")); // to convert patch requests

main()
   .then((res) => {
    console.log("connection success ful")
   })
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
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
      //  console.log(chats);
       res.render("index.ejs",{chats});
  })
 
 // make form
   app.get("/chats/new",(req,res) => {
       res.render("form.ejs")
   })
// create route
   app.post("/chats", async(req,res,next) =>{
      try {
        let {from,msg,to} = req.body; // here name is used of form
        // inserting in database
        let newchat = new Chat ({
          from:from,
          to:to,
          msg:msg,
          created_at: new Date()
        })
        await  newchat.save()
        res.redirect("/chats")
      }  
      catch(err) {
        next(err)
      }
   })

    //edit and update: 
  app.get("/chats/:id/edit", async (req,res) => {
     try{
      let{id} = req.params;
      let post = await Chat.findById(id);
      if(!post) {
       throw new ExpressError(402,"chat not found ab bhag yha sa") 
       // next(new ExpressError(402,"chat not found ab bhag yha sa"))
      }

       res.render("edit.ejs",{post})
     } catch(err) {
      next(err)
    }
    })
  // updating using put request
  app.put("/chats/:id/", async (req,res) => {
    try{
      let{id} = req.params;
    let {msg:newmsg} = req.body;  // message ko liya ja rah hai jiski id match hui
    let updatedchat = await Chat.findByIdAndUpdate(id,
      {msg:newmsg},
       {runValidators:true,new:true}  ) // so that schema also apply on updated value and in console print update value not old thus new

       console.log(updatedchat)
       res.redirect("/chats")
    }catch(err) {
      next(err)
    }
 })


    //delete route
    app.delete("/chats/:id/",async(req,res) => {
       try{
        let{id} = req.params;
       let deleted = await Chat.findByIdAndDelete(id);
       console.log(" THIS IS DELETED ",deleted);
       res.redirect("/chats");
       } catch(err) {
        next(err)
      }
 })



 app.use((err, req, res, next) => {
  console.log("-----ERROR------");
  console.log(err);

  let status = err.status || 500;
  let message = err.message || "Something went wrong";

  res.status(status).send(message);
});


app.listen(8080,(req,res) => {
    console.log("server running on port 8080")
});


