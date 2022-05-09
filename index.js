const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfbbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("dWareHouse").collection("items");
//   console.log('db connected');
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("dWareGouse").collection("user");
        // const user = { name: 'bila', email: 'billa@gmail.com'};
        // const result = await userCollection.insertOne(user);
        // console.log(`user inserted with id: ${result.insertedId}`)
        
        app.get('/item', async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/item/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const users = await userCollection.findOne(query);
            res.send(users);
        });

        //post
        app.post('/item', async(req, res) =>{
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Running D-Warehouse Server');
});

app.listen(port, ()=>{
    console.log('listening to port', port);
})