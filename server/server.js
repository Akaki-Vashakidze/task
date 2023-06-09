
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
                let data = await JSON.parse(jsonData)
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

app.put("/api/data/addElement", bodyParser.json(), async (req, res) => {
    const element = req.body
    console.log(element)
    fs.readFile('./data.json', 'utf-8', async (err, jsonData) => {
        if (err) {
            console.log(err)
        } else {
            try {
               let data = await JSON.parse(jsonData)
                data.push(element)
                res.json({
                    "data": data
                })
                fs.writeFileSync('./data.json', JSON.stringify(data));
            } catch {
                console.log('error parsing data', err)
            }
        }
    })
})

app.put("/api/data/editElement", bodyParser.json(), async (req, res) => {
    const element = req.body.editedData
    const id = req.body.id
    fs.readFile('./data.json', 'utf-8', async (err, jsonData) => {
        if (err) {
            console.log(err)
        } else {
             try {
                   let data = await JSON.parse(jsonData)
                   for(let i = 0; i< data.length; i++) {
                    if(data[i].id == id) {
                        data.splice(i, 1)
                        data.splice(i,0,element)
                    }
                   }
                res.json({
                    "data": data
                })
                fs.writeFileSync('./data.json', JSON.stringify(data));
            } catch {
                console.log('error parsing data', err)
            }
        }
    })
})

app.get("/api/data", (req, res) => {
    res.json({
        "data": data
    })
})
app.listen(3500, () => { console.log("server started on port 3500") })