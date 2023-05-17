
const express = require('express')
const data = require('./data.json')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

async function readData() {
    fs.readFile('./data.json', 'utf-8', async (err, jsonData) => {
        if (err) {
            console.log(err)
        } else {
            try {
                readDataFile = await JSON.parse(jsonData)
                return readDataFile;
            } catch {
                console.log('error parsing data', err)
            }
        }
    })
}

app.delete("/api/data/delete/:id", bodyParser.json(), async (req, res) => {
    const id = req.params.id
    fs.readFile('./data.json', 'utf-8', async (err, jsonData) => {
        if (err) {
            console.log(err)
        } else {
            try {
               let data = await JSON.parse(jsonData)
                console.log(data)
                let filteredData = data.filter(item => {
                   return item.id != id;
                })
                res.json({
                    "data": filteredData
                })
                fs.writeFileSync('./data.json', JSON.stringify(filteredData));
            } catch {
                console.log('error parsing data', err)
            }
        }
    })
})

// დაას დააფდეითება
// fs.writeFileSync('./data.json', JSON.stringify('რაღაც ახალი დათა'));

app.get("/api/data", (req, res) => {
    res.json({
        "data": data
    })
})

// app.post("/api/data", bodyParser.json(), (req, res) => {
//     const data = req.body
//     fs.writeFileSync('./data.json', JSON.stringify(data));
//     readData(res)
// })

app.listen(3500, () => { console.log("server started on port 3500") })