const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
//middle wire

app.use(cors())
app.use(express.json())
//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2ts2.mongodb.net/?retryWrites=true&w=majority`;
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
        });
        app.post('/email', async (req, res) => {
            // console.log("hit");
            // console.log(req.body);
            const body = req.body;
            const toEmail = body.toEmail;
            const subject = body.subject;
            const text = body.text;

            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {

                    user: process.env.sendFromEmail,
                    pass: process.env.passSendFrom,
                },
                from: process.env.sendFromEmail,

            });
            const options = {
                from: req.body.sendFromEmail,
                to: `${toEmail}`,
                subject: `${subject}`,
                text: `${text}`
            }
            transporter.sendMail(options, function (err, info) {
                if (err) {
                    console.log(err);
                    res.send({ success: false })
                }
                else {
                    res.send({ success: true })
                }
            })
        });




    } catch (error) {

    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("Server Running")
});

app.listen(port, async (req, res) => {
    console.log("Listening to ", port);
})