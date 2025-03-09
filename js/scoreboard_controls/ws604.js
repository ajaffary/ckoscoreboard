// connect to WS604 Timer

const addr_cko = '192.168.1.200';
const addr_ws = '192.168.4.1';
// use instead of window.location.hostname

function connectToJamTimer() {
    // window.onload = () => { 
        let dis = "";
        // create a new WebSocket connection to clock's websocket server
        const Socket = new WebSocket('ws://' + addr_cko + ':81/');
        console.log('Connected to Jam Timer Websocket');
        
        // a new message event occurs every time clock element is updated
        Socket.onmessage = (event) => {
            // get original message
            dis = event.data;
            console.log(event.data);
            // update jam-timer element
            document.getElementById("jam-timer").innerHTML = dis;
        }
        Socket.onclose = (event) => {
            console.log('Jam Timer Websocket connection closed:', event);
            // attempt reconnect after a delay
            setTimeout(connectToJamTimer, 10000);
        };
        
        Socket.onerror = (error) => {
            console.error('Jam Timer Websocket error:', error);
            // close connection before attempting to reconnect 
            // after an error
            Socket.close();
        };
    }
//}
document.addEventListener('DOMContentLoaded', (event) => { 
    connectToJamTimer();
});