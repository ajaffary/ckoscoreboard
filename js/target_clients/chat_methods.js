// chat window methods are shared by scoreboard_controls and 
// scoreboard_announcer clients

// create sendChat callback function to handle outgoing chat message
function sendChat() {
    incomingChat.value += `${clientId}: ${outgoingChat.value}\n`;
}

// incoming chat textarea element
const incomingChat = document.getElementById('incoming-chat');

// create variable for outgoing chat message
const outgoingChat = document.getElementById('outgoing-chat');

// create variable for send chat button
const sendChatButton = document.getElementById('send-chat-button');

// attach event handler to send chat button to send outgoing chat message to server
sendChatButton.addEventListener('click', () => {
    const message = {
        type: 'chat',
        senderId: clientId,
        targetId: outgoingChat.dataset.targetid,
        content: outgoingChat.value,
    };
    ws.send(JSON.stringify(message));
    console.log(`Sent message: ${JSON.stringify(message)}`);
    outgoingChat.value = '';
});