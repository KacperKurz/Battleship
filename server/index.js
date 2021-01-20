const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());
app.use(cors());
const port = 3030;

let games = {};

const chceckWinCondition = board => {
  return board.reduce((acc,elem)=>{
    return elem==2?acc+1:acc
  })==31?true:false
}

app.get('/', (req, res) => {
  res.send(Object.keys(games));
})

app.post('/new', (req,res) =>{
  id = uuidv4()
  games[id]={}
  res.send(id)
})

app.get('/:id',(req,res)=>{
  res.send(games[req.params.id])
})

app.post('/join/:id',(req,res)=>{
  games[req.params.id][req.body.player]={}
  res.send()
})

app.post('/',(req, res) => {
    games[req.body.id] = !games[req.body.id]?{}:games[req.body.id];
    games[req.body.id][req.body.player] = !games[req.body.id][req.body.player]?{}:games[req.body.id][req.body.player];
    games[req.body.id][req.body.player].board = req.body.board.board;
    games[req.body.id][req.body.player].guess = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    games[req.body.id][req.body.player].res = res;
    
    if (games[req.body.id]['1'] && games[req.body.id]['2'] && games[req.body.id]['1'].res && games[req.body.id]['2'].res) games[req.body.id]['1'].res.send("your turn");
})

app.patch('/:field', (req, res) => {
  games[req.body.id][req.body.player].res=res
  //write to board 
  games[req.body.id][req.body.player].guess[req.params.field] = games[req.body.id][req.body.player==1?2:1].board[req.params.field]==1?2:1
  games[req.body.id][req.body.player==1?2:1].board[req.params.field] = games[req.body.id][req.body.player==1?2:1].board[req.params.field]==1?3:2
  //check win condition
  if (chceckWinCondition(games[req.body.id][req.body.player].guess)){
    games[req.body.id][req.body.player].res.send("You won!")
    games[req.body.id][req.body.player==1?2:1].res.send("You lost!")
      delete games[req.body.id]
  }
  else{
    //send
    games[req.body.id][req.body.player==1?2:1].res.send({
      board: games[req.body.id][req.body.player==1?2:1].board,
      guess: games[req.body.id][req.body.player==1?2:1].guess
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

