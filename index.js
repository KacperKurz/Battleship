const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

let games = {}

app.get('/', (req, res) => {
  res.send(games)
})

app.post('/',(req, res) => {
    games[req.body.id] = !games[req.body.id]?{}:games[req.body.id]
    games[req.body.id][req.body.player] = !games[req.body.id][req.body.player]?{}:games[req.body.id][req.body.player]
    games[req.body.id][req.body.player].board = req.body.board
    games[req.body.id][req.body.player].res = res
    
    if (games[req.body.id]['1'] && games[req.body.id]['2'] && games[req.body.id]['1'].res && games[req.body.id]['2'].res) games[req.body.id]['1'].res.send("your turn")

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
