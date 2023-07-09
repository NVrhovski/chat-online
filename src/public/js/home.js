let socket;
let username = '';
let chatInput = document.getElementById('chat-input');
let chatContainer = document.getElementById('chat-container');

window.onload = (async () => {
    socket = io();

    getMessages();

    socket.on('server_message_sent', (data) => {
        const messages = JSON.parse(data);
        let html = '';
        messages.forEach((el) => {
            html += `
            <p><strong>${el.username}</strong>: ${el.message}</p>
            `
        })
        chatContainer.innerHTML = html;
    })
    let res = await Swal.fire({
        title: 'Enter your username',
        input: 'text',
        inputLabel: 'Your username',
        inputPlaceholder: 'Username'
    });
    username = res.value;
})

chatInput.onkeyup = ((event) => {
    if(event.key == 'Enter' && chatInput.value)
    {
        socket.emit('client_message_sent', JSON.stringify({username, message: chatInput.value}));
        chatInput.value = '';
    }
})

const getMessages = (async () => {
    try {
        let res = await fetch('http://localhost:8080/getHistory');
        let json = await res.json();
        let html = '';
        json.forEach((el) => {
            html += `
            <p><strong>${el.username}</strong>: ${el.message}</p>
            `
        })
        chatContainer.innerHTML = html;
    } catch (error) {
        console.log(error)
    }
})