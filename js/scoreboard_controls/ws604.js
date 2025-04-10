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
            // get original message
            display = event.data;
            // unique data:  when jam timer begins, data is 01:00
            // when jam timer hits play, data is two digits xx
            // when jam timer hits pause, data is :xx rather than xx
            console.log(event.data);
            // update jam-timer element
            if (event.data == "01:00") {
                // this means clock has been reset to 1:00
                // use this to activate clear clock function
                console.log("Timer RESET")
            } else if (event.data[0] == ":") {
                // this means timer is paused
                // use this to activate stop clock function
                console.log("Timer STOP")
            } else if (event.data.length() == 2) {
                // this means clock is ticking
                // timer only sends two digits
                // could set condition event.data == "59"
                // and activate start clock function
                console.log("Timer COUNTDOWN")
            }
            document.getElementById("jam-timer").innerHTML = display;
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