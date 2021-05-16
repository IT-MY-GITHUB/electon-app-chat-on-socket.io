// Apps Variables
const express = require('express')
const http = require('http')
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const Moniker = require('moniker');
const PORT = process.env.PORT || 8080;

// Route '/' = render index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/indexBrowser.html');
});

// Route '/' = render index.html
app.get('/app', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// use a static folder for front style and js files
app.use(express.static('./public'));

// Array of users
let usersMap = []

// Functions for add and remove users to/from Users list
function addUserToMap(userName){
usersMap.push(userName);
}
function removeUserFromMap(userName){
usersMap = usersMap.filter(item => item !== userName)
}

io.on('connection', (socket) => {
    //Get random nickname 
    socket.username = Moniker.choose();

    // add user to users map
    addUserToMap(socket.username);
	io.emit('add user', usersMap)

    // When joined new user, send msg from Server to users
    socket.broadcast.emit('user joined', socket.username);

    // When user disconnect send msg from Server to users
    socket.on('disconnect', name => {
        socket.broadcast.emit('user disc', socket.username);
        // dell user from users map
        removeUserFromMap(socket.username)
        io.emit('del user', usersMap)
    });

    // Messages get and send to all this msg with username
    socket.on('chat message', (msg) => {
        io.emit('chat message', { message: msg, user: socket.username });
    });
})

server.listen(PORT, () => {
    console.log('listening on Port: ' + PORT)
})