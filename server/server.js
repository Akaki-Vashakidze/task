
const express = require('express')
const data = require('./data.json')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

let readDataFile;

async function readData(res) {
    fs.readFile('./data.json', 'utf-8', async (err, jsonData) => {
        if (err) {
            console.log(err)
        } else {
            try {
                readDataFile = await JSON.parse(jsonData)
                res.json({
                    'data':readDataFile
                })
            } catch {
                console.log('error parsing data', err)
            }

        }
    })
}



// დაას დააფდეითება
// fs.writeFileSync('./data.json', JSON.stringify('რაღაც ახალი დათა'));

app.get("/api/data", (req, res) => {
    res.json({
        "data": data
    })
})

app.post("/api/data", bodyParser.json(), (req, res) => {
    const data = req.body
    fs.writeFileSync('./data.json', JSON.stringify(data));
    readData(res)
})

app.listen(3500, () => { console.log("server started on port 3500") })