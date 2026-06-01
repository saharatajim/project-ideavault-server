//additional
const dns = require("node:dns");  
dns.setServers(["8.8.8.8", "8.8.4.4"]); 
require('dotenv').config() 

const express = require('express')
const app = express()
const port = 5000

// additional
const cors=require("cors") 
app.use(cors())
app.use(express.json()) 

app.get('/', (req, res) => {
  res.send('Hello World! tajim');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const console = require("node:console");
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function server() {
  try {
  

     const db=client.db("ideavault")
   const ideasCollection=db.collection("ideas")
   const commentsCollection=db.collection("comments")
    await client.connect();

      app.post("/ideas",async(req,res)=>{
    const newIdea=req.body
     console.log(newIdea);
    const result=await ideasCollection.insertOne(newIdea)
    console.log(result)
    res.json(result)
    
  })
  app.get("/ideas",async(req,res)=>{
    const allideas=await ideasCollection.find().toArray()
    res.json(allideas)
  })
  app.get("/ideas/:id",async(req,res)=>{
    const{id}=req.params
    const result=await ideasCollection.findOne({
      _id: new ObjectId(id)
    })
    res.json(result)
  })

app.get("/my-ideas/:userId",async (req,res)=>{
   const{userId}=req.params
 const result=await ideasCollection.find({
      userId
    }).toArray()
    res.json(result)
})
app.delete("/my-ideas/:userId",async (req,res)=>{
   const{userId}=req.params
 const result=await ideasCollection.deleteOne({
      userId
    })
    res.json(result)
})
app.patch("/my-ideas/:userId",async(req,res)=>{
  const {userId}=req.params
  const updateIdea=req.body
  console.log(updateIdea)
  const result = await ideasCollection.updateOne(
    {userId},
    {$set:updateIdea}
  )
  res.json(result)
})

  // comments collection
      app.post("/comments/",async(req,res)=>{
        
    const newComment=req.body
     console.log(newComment);
    const result=await commentsCollection.insertOne(newComment)
    console.log(result)
    res.json(result)
    
  })

    app.get("/comments",async(req,res)=>{
    const allComments=await commentsCollection.find().toArray()
    res.json(allComments)
  })
  app.get("/comments/:ideaId",async (req,res)=>{
   const{ideaId}=req.params
  const allComments = await commentsCollection.find({ selectedIdeaById: ideaId }).toArray()
    res.json(allComments)
})
app.delete("/comments/:id",async(req,res)=>{
   const {id}=req.params
     const result = await commentsCollection.deleteOne({ _id: new ObjectId(id) })
      res.json(result)
  })
  
  app.patch("/comments/:id",async(req,res)=>{
  const {id}=req.params
  const updateComment=req.body
  console.log(updateComment)
  const result = await commentsCollection.updateOne(
    {_id: new ObjectId(id)},
    {$set:updateComment}
  )
  res.json(result)
})
  // my interaction page
  app.get("/comments/user/:userId", async (req, res) => {
const {userId}=req.params
console.log(userId)
const userComments = await commentsCollection.find({userId }).toArray()
console.log(userComments)
  res.json(userComments)

})

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
server().catch(console.dir);
