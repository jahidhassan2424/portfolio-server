const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middle wire

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${"portfolio_website"}:${"cd3Ne0DsJcCx6zq7"}@cluster0.h2ts2.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2ts2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        console.log('DB Connected');
        const projectsCollection = client.db("portfolio").collection("projects");


        //get requests

        //Get all projects
        app.get('/projects', async (req, res) => {
            const data = await projectsCollection.find().toArray();
            res.send(data);
            console.log(data)
        });




    } catch (error) {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    console.log("working");
    res.send("Server Running")
});

app.listen(port, async (req, res) => {
    console.log("Listening to ", port);
})