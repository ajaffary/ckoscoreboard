// connect to WS604 Timer

const addr_cko = '192.168.1.200';
const addr_ws = '192.168.4.1';
// use instead of window.location.hostname

let Socket = null;

function connectToJamTimer() {
    // window.onload = () => { 
        let dis = "";
        // create a new WebSocket connection to clock's websocket server
        Socket = new WebSocket('ws://' + addr_cko + ':81/');
        console.log('Connected to Jam Timer Websocket');
        
        // a new message event occurs every time clock element is updated
        Socket.onmessage = (event) => {
            // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/message_event
            // no unique identifying information from below
            console.log(`event origin: ${event.origin}`);
            console.log(`event source: ${event.source}`);
            console.log(`event lastEventId: ${event.lastEventId}`);
            console.log(JSON.stringify(event));
            // https://developer.mozilla.org/en-US/docs/Web/API/Event
            // perhaps a way to get identifying information if 
            // the event was sent from play/pause button
            console.log(`event type: ${event.type}`);
            // get original message
            dis = event.data;
            // unique data:  when jam timer begins, data is 01:00
            // when jam timer hits pause, data is :xx rather than xx
            console.log(event.data);
            // update jam-timer element
            if (event.data == "01:00") {
                console.log("Timer START")
            } else if (event.data[0] == ":") {
                console.log("Timer STOP")
            }
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
    //}
}

function onclicknum(nums) {
    Socket.send("#" + nums);
}

document.addEventListener('DOMContentLoaded', (event) => { 
    connectToJamTimer();
});