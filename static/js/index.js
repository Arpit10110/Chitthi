const socket = io()
let Uname;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.msgarea')
var messC="";
do {
    Uname = prompt('Please enter your name: ')
} while(!Uname)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(e.target.value=='\n')
        {
            alert("Please enter the message");
        }
        else{
            sendMessage(e.target.value)
        }
    }
})
function sendMessage(message) {
    let msg = {
        user: Uname,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'incoming')
    textarea.value = ''
    scrollToBottom()
    // Send to server 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    if(type=='incoming') 
    {
        const audio = new Audio("./music/sent.mp3");
        audio.play(); 
    }
    else{
        const audio = new Audio("./music/rece.mp3");
    audio.play(); 
    }
    mainDiv.classList.add(className, 'message')
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'outgoing')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
