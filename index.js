const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running my node server");
});

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.mgrj0wv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
    try {
      await client.connect();
      console.log("mongodb connected");
    const projectsCollection = client.db("arif-islam").collection("projects")
    
    // get projects

    app.get('/project', async (req, res) =>{
      const query ={}
      const cursor = projectsCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
      })
      //get project details
    app.get('/project/:id' , async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const fruit= await projectsCollection.findOne(query);
      res.send(fruit);

    })   
    } finally {
      
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
  console.log("crud server is running ");
});
