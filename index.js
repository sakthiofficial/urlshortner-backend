
import express from "express";
import { geturl } from "./geturl.js";
import { MongoClient } from "mongodb";
import cors from "cors"
import * as dotenv from 'dotenv';

// const express = require("express")
const port = 4000
const app = express();
app.use(cors())
dotenv.config()


// MOngo Connection
const MONGO_URL = process.env.MONGO_URL;

const mongo = new MongoClient(MONGO_URL)
await mongo.connect()
console.log("Mongo Connected");
app.use(express.json())
app.get("/", async (req, res) => {
    res.send("Server is Running Succes Fully 🎉🎉✨✨")
})

app.post("/shorturl", async (req, res) => {
    const url = req.body
    const shortUrl = geturl(url.url.split(""))
    const data = await mongo.db("shorturl").collection(url.name).findOne({ longurl: url.url })

    try {
        const userUrl = await mongo.db("shorturl").collection(url.name).insertOne({ longurl: url.url, shorturl: shortUrl }, (err, msg) => {
            if (msg) {
                if (!data) {
                    res.status(200).send(JSON.stringify({ shorted: shortUrl }))

                } else {
                    res.status(401).send("Something Wrong")
                    console.log("Iam ruuning");

                }
            } else {
                res.status(401).send("Something Wrong")
            }
        })
    } catch (error) {
        res.send("Something Wrong")

    }

});
app.get("/:url", async (req, res) => {
    const { url } = req.params
    const { name } = req.query
    await mongo.db("shorturl").collection("sakthi").findOne({ shorturl: url }, (err, msg) => {
        res.send(msg)
        console.log(msg, "longurl");
    });
    // console.log(name);
    // res.send(data.longurl)

})
app.get("/all/urls", async (req, res) => {
    const data = await mongo.db("shorturl").collection("sakthi").find()

    res.send(await data.toArray());
    console.log(await data.toArray());




})
app.delete("/deleteurl", async (req, res) => {
    const info = req.body
    const data = await mongo.db("shorturl").collection(info.name).deleteOne({ longurl: info.longurl }, (err, msg) => {
        if (msg) {
            res.status(200).send(msg)
            console.log(info);

        } else {
            res.status(401).send("Something Went Wrong")

        }

    })






})
app.listen(port, () => console.log("Port Running"))



