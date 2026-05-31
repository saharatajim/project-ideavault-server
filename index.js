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




const { MongoClient, ServerApiVersion } = require('mongodb');
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
    await client.connect();

      app.post("/ideas",async(req,res)=>{
    const newIdea=req.body
     console.log(newIdea);
    const result=await ideasCollection.insertOne(newIdea)
    res.json(result)
    
  })
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
server().catch(console.dir);
