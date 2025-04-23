<!--
    <textarea id="messages" rows="10" cols="50"></textarea><br>
    <input id="targetId" type="text" placeholder="Target Client ID"><br>
    <input id="messageInput" type="text" placeholder="Type a message">
    <button id="sendButton">Send</button>


    <script>
        // websocket client code
        const ws = new WebSocket('ws://localhost:3000');
        let clientId = null;

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'welcome') {
                clientId = data.clientId;
                console.log(`Assigned Client ID: ${clientId}`);
            } else if (data.type === 'message') {
                const messages = document.getElementById('messages');
                messages.value += `${data.content}\n`;
            } else if (data.type === 'error') {
                alert(data.message);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');
        const targetIdInput = document.getElementById('targetId');

        sendButton.addEventListener('click', () => {
            const message = {
                type: 'sendTo',
                senderId: clientId,
                targetId: targetIdInput.value,
                content: messageInput.value,
            };
            ws.send(JSON.stringify(message));
            messageInput.value = '';
        });

        const updateHomeTeamScoreButton = document.getElementById('home-team-update-score-button');
        
        updateHomeTeamScoreButton.addEventListener('click', () => {
            // construct message to be sent to target client
            const message = {
                type: 'sendTo',
                senderId: clientId,
                targetId: targetIdInput.value,
                content: {
                    home: homeTeamScore.textContent,
                    away: awayTeamScore.textContent,
                },
            };
            ws.send(JSON.stringify(message));
            messageInput.value = '';
        });
        
    </script>
    -->

                // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event
            // no unique identifying information from below
            // console.log(`event origin: ${event.origin}`);
            // console.log(`event source: ${event.source}`);
            // console.log(`event lastEventId: ${event.lastEventId}`);
            // console.log(JSON.stringify(event));
            // https://developer.mozilla.org/en-US/docs/Web/API/Event
            // perhaps a way to get identifying information if 
            // the event was sent from play/pause button
            // console.log(`event type: ${event.type}`);