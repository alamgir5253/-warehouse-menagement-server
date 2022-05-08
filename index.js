const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// middle ware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASSWORD}@cluster0.hju5d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    client.connect()
    const CarCollection = client.db("dreamCar").collection("car");

    app.get('/cars', async(req,res) =>{
      const query ={}
      const cursor = CarCollection.find(query);
      const result = await cursor.limit(6).toArray();
      res.send(result)
    })
    app.get('/ManageInventories', async(req,res) =>{
      const query ={}
      const cursor = CarCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    // delete api for manage inventories page
    app.delete('/ManageInventories/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await CarCollection.deleteOne(query)
      res.send(result)
    })
    // post api for add item 
    app.post('/ManageInventories', async(req,res)=>{
      const newItem = req.body;
      const result = await CarCollection.insertOne(newItem)
      res.send(result)
    })
  }
  finally{

  }

}
run().catch(console.dir)

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('conected to mongo db');
//   client.close();
// });


app.get('/', (req, res) =>{
  res.send('success')
})
app.listen(port, () =>{
  console.log('lintening to port', port);
})
