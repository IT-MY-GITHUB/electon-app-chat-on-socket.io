// require depend for remote control
const remote = require('electron').remote

// Get App window
const wnd = remote.getCurrentWindow();

// Events for buttons
document.addEventListener('DOMContentLoaded', ()=> {
	let btnMin = document.querySelector('.btn-min');
	let btnMax = document.querySelector('.btn-max');
	let btnClose = document.querySelector('.btn-close');

	btnMin.addEventListener('click', ()=> {
		wnd.minimize();
	})

	btnMax.addEventListener('click', ()=> {
		if(!wnd.isMaximized()) {
			wnd.maximize();
		}else {
			wnd.unmaximize();
		}	
	})

	btnClose.addEventListener('click', ()=> {
		wnd.close();
	})
})
// Variables
const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const users = document.querySelector('.users__list');

// Event
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// add new message
socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.innerHTML = "<b>" + msg.user + "</b>" + ': ' + msg.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Add new user to users list
socket.on('add user', data => {
    renderUserList(data);
})

// Remove user from users list
socket.on('del user', data => {
    renderUserList(data);
})

// render new users list when deleted or added user
function renderUserList(data) {
        while (users.firstChild) {
        users.removeChild(users.firstChild);
    }
    data.forEach(e => {
        let userChat = document.createElement('li');
        userChat.classList.add('user')
        userChat.textContent = e;
        users.appendChild(userChat)
    })
}

// Server Messages
socket.on('user joined', data => {
    let item = document.createElement('li');
    item.classList.add('join')
    item.innerHTML = '[Server]: ' + "<b><i>" + data + "</i></b>" + ' ' + '( joined )';
    messages.appendChild(item);
})
socket.on('user disc', data => {
    let item = document.createElement('li');
    item.classList.add('disc')
    item.innerHTML = '[Server]: ' + "<s><i>" + data + "</i></s>" + ' ' + '( disconnected )';
    messages.appendChild(item);
})