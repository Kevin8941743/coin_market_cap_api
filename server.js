import express from "express"
import rateLimit from "express-rate-limit"
import axios from "axios"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createClient } from "redis"

dotenv.config()
const app = express()
const MongoDB = process.env.MONGO_DB
const port = 3000
const API_KEY = process.env.API_KEY
const client = createClient({
    url: process.env.REDIS_URL
})

try {
    await mongoose.connect(MongoDB)
    console.log("Connection to MongoDB Atlas has been successful!")
} catch (error) {
    console.error("Failed to connect to Mongo Atlas", error.message)
}

try { 
    await client.connect()
    console.log("The redis cache has been connected!")
} catch (error) {
    console.error("Failed to connect to Redis!", error.message)
}

const limiter = rateLimit({
    max: 15,
    windowMs: 20 * 60 * 1000,
    message: "Please wait 20 minutes before sending API requests!"
})

app.get("/everything", async (req, res) => {

    try {
        const api_data = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            {
                headers: {
                    Accept: "application/json",
                    "X-CMC_PRO_API_KEY": API_KEY
                }
            }
    )

    res.json(api_data.data)

} catch (error) {
    console.log(error)

    res.status(500).json({
        error: "Unable to access the API!",
        details: error.message
    })
}})

app.get("/coin/:type", limiter, async (req, res) => {
    try {
        
        const typing = req.params.type.toLowerCase()
        
        const redis_cache = await client.get(typing)

        if (redis_cache) {
            console.log(`Checking the cache for ${typing}`)
            return res.json(JSON.parse(redis_cache))
        }