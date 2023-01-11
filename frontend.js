//Displaying chat page after login

const socket = io('http://localhost:8000');


let chatpage = document.getElementById('container3')

let btn1 = document.getElementById('btn1')

let loginpage = document.getElementById('container')

const form = document.getElementById('container3')
const msginput = document.getElementById('input')
const messageinput = document.getElementById('type-box')
//const userjoin = document.getElementById('joined')

let append = (message, position) => {
    let usernamecontainer = document.createElement('div')
    let username = document.createElement('div')
    username.classList= 'joined'
    usernamecontainer.innerText = message
    usernamecontainer.classList.add(position)
    messageinput.appendChild(username)
    username.appendChild(usernamecontainer)
    
}
let msgappend = (message,position)=>{
    let msgcontainer = document.createElement('div')
    msgcontainer.classList='first'
    messageinput.appendChild(msgcontainer)
    let msgparagraph = document.createElement('p')
    msgparagraph.classList='message1'
    msgparagraph.classList.add('right')
    msgcontainer.appendChild(msgparagraph)
    msgcontainer.classList.add(position)
    msgparagraph.innerText = message
}


form.addEventListener('submit',(p)=>{
    p.preventDefault();
    const message = msginput.value;
    msgappend(`You:${message}`,'right')
    socket.emit('send',message)
    msginput.value = '';
})

socket.on('user-joined', name => {
    append(`${name} joined th chat`,'joined-user')

})
socket.on('recive', messagetxt => {
    msgappend(`${messagetxt.name}: ${messagetxt.message}`,'left')

})
socket.on('leave', name => {
    append(`${name} left the chat`,'joined-user')

})



btn1.addEventListener('click', (event) => {
    loginpage.classList.add('active')
    chatpage.classList.remove('active')
    event.preventDefault()

    let username = document.querySelector('input').value

    if (username.length == 0) {
        return
    }
    socket.emit('new-user', username)

})






