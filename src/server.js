const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express();

//permissao de acesso
app.use(cors());

const server = require('http').Server(app)
const io = require('socket.io')(server)

//isola usuario em uma sala
io.on('connection', socket => {
  socket.on('connectRoom' , box =>{
    socket.join(box);
  })
});

mongoose.connect('mongodb+srv://sisadm:sis.adm987@cluster0-4u7yc.mongodb.net/dropbox?retryWrites=true', 
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));
server.listen(process.env.PORT || 3333);