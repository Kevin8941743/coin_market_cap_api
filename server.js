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
