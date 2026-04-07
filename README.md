# Coin Market Cap API

A personal cryptocurrency API built with **Express**, **Axios**, **MongoDB Atlas**, and **Redis**. It fetches real-time cryptocurrency data from CoinMarketCap and caches results for faster response times.

---

## Features

- Fetch all cryptocurrency listings.
- Fetch a specific coin by name.
- Redis caching for faster responses.
- Rate limiting to prevent abuse.
- MongoDB Atlas integration for storing coin data if needed.

---

## Technologies Used

- **Node.js** & **Express** – Backend server.
- **Axios** – For making API requests to CoinMarketCap.
- **MongoDB Atlas** – Database for storing coins (optional).
- **Redis** – Caching API responses.
- **express-rate-limit** – API rate limiting.
- **dotenv** – Environment variable management.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Redis installed locally or via Docker
- MongoDB Atlas account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kevin8941743/coin_market_cap_api.git
cd coin_market_cap_api
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add:

```bash
API_KEY=YOUR_API_KEY
REDIS_URL=YOUR_REDIS_URL
MONGO_DB=YOUR_MONGO_STRING
```

4. Start Redis if running locally:

```bash
brew services start redis
```

5. Run the server:

```bash
node server.js
```
The server is now listening on http://localhost:3000


### API Endpoints

Get All Coins

```bash
GET /everything
```

Response:

```bash
{
  "status": {...},
  "data":  [...list of coins...]
}
```

Get Coin by Name

```bash
GET /coin/:type
```

Parameters:
- Type – The name of the cryptocurrency (e.g. bitcoin)

Response:

```bash
{
  "_id": "mongodb_id",
  "name":  ["Bitcoin"],
  "symbol": "BTC",
  "price": 6000
}
```

### Rate Limiting

Max 15 requests per 20 minutes.

Exceeding requests will receive:

```bash
{
  "message": "Please wait 20 minutes before sending API requests!"
}
```

### Error Handling

API error returns HTTP 500 with a message:

```bash
{
  "error": "Unable to access the API!",
  "details": "Error message from Axios or MongoDB"
}
```
















